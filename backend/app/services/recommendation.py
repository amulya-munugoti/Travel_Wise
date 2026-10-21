import math
from typing import List, Optional, Tuple, Dict
from sqlalchemy.orm import Session
from app.models.place import Place
from app.schemas.place import RecommendationRequest, PlaceResponse

# Known reference coordinates for popular Indian cities/regions
KNOWN_CITY_COORDINATES: Dict[str, Tuple[float, float]] = {
    "hyderabad": (17.3850, 78.4867),
    "secunderabad": (17.4399, 78.4983),
    "warangal": (17.9689, 79.5941),
    "bengaluru": (12.9716, 77.5946),
    "bangalore": (12.9716, 77.5946),
    "goa": (15.2993, 74.1240),
    "north goa": (15.5553, 73.7517),
    "south goa": (15.2000, 74.0000),
    "jaipur": (26.9124, 75.7873),
    "munnar": (10.0889, 77.0595),
    "kerala": (10.0889, 77.0595),
    "delhi": (28.6139, 77.2090),
    "agra": (27.1767, 78.0081),
    "mumbai": (19.0760, 72.8777),
    "pune": (18.5204, 73.8567),
    "chennai": (13.0827, 80.2707),
    "vizag": (17.6868, 83.2185),
    "visakhapatnam": (17.6868, 83.2185),
    "nandi hills": (13.3702, 77.6835),
    "chikkaballapur": (13.4355, 77.7315),
}

CITY_ALIASES = {
    "bangalore": "bengaluru",
    "nandi hills": "chikkaballapur",
}


def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates great-circle distance between two points in kilometers."""
    r = 6371.0  # Earth's radius in kilometers
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2.0) ** 2 +
         math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2)
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(r * c, 1)


def normalize_city(location_name: str) -> str:
    """Normalize common city aliases without guessing an unknown location."""
    cleaned = location_name.split(",", 1)[0].strip().lower()
    return CITY_ALIASES.get(cleaned, cleaned)


def get_city_coords(location_name: str) -> Optional[Tuple[float, float]]:
    raw_city = location_name.split(",", 1)[0].strip().lower()
    return KNOWN_CITY_COORDINATES.get(raw_city) or KNOWN_CITY_COORDINATES.get(normalize_city(location_name))


def get_destination_places(db: Session, destination: str) -> List[Place]:
    """Return only catalogue places belonging to the requested destination."""
    city = normalize_city(destination)
    if not city or city == "all":
        return db.query(Place).all()
    return db.query(Place).filter(Place.city.ilike(city)).all()


def supported_destinations(db: Session) -> List[str]:
    return [row[0] for row in db.query(Place.city).distinct().order_by(Place.city).all()]


def unsupported_destination_detail(db: Session, destination: str) -> str:
    cities = ", ".join(supported_destinations(db))
    return (
        f"TravelWise currently has curated catalogue places for {cities}. "
        f"It has no catalogue places for {destination.strip()!r}, so it cannot build a destination-specific itinerary there."
    )


def get_recommended_places(
    db: Session,
    request: RecommendationRequest,
    limit: int = 15
) -> List[PlaceResponse]:
    """
    Intelligently recommends places matching interests, proximity, budget, and trip style.
    """
    start_coords = get_city_coords(request.starting_location)
    all_places = get_destination_places(db, request.destination or "all")
    if not all_places:
        return []

    # User interest keywords
    user_interests = set(i.strip().lower() for i in request.interests if i.strip())
    
    daily_budget_per_person = (request.budget / max(1, request.number_of_travelers)) / max(1, request.number_of_days)

    scored_places = []
    for place in all_places:
        # Distance calculation
        dist_km = (
            haversine_distance_km(*start_coords, place.latitude, place.longitude)
            if start_coords
            else None
        )
        
        # Interest match score (0.0 to 1.0)
        place_interests = set(
            [place.category.lower()] +
            [s.strip().lower() for s in place.suitable_interests.split(",") if s.strip()]
        )
        common_interests = user_interests.intersection(place_interests)
        interest_score = len(common_interests) / max(1, len(user_interests)) if user_interests else 0.5
        
        # Budget friendliness score
        # Places with reasonable entry fees compared to daily budget
        cost_ratio = place.estimated_cost / max(100.0, daily_budget_per_person)
        budget_score = max(0.0, min(1.0, 1.0 - (cost_ratio * 0.5)))
        
        # Distance penalty/score: closer places or logical getaways within reach
        # For 2-day trips, destinations within 250km get higher weight
        if dist_km is None:
            dist_score = 0.5
        elif dist_km <= 30:
            dist_score = 1.0
        elif dist_km <= 150:
            dist_score = 0.85
        elif dist_km <= 350:
            dist_score = 0.70
        else:
            dist_score = 0.50

        # The bundled catalogue has no live rating source. Use a neutral value
        # so hand-entered demo ratings do not distort destination matching.
        rating_score = 0.8

        # Weighted aggregate score
        total_score = (
            (interest_score * 0.40) +
            (budget_score * 0.20) +
            (dist_score * 0.25) +
            (rating_score * 0.15)
        )

        place_resp = PlaceResponse.model_validate(place)
        place_resp.distance_km = dist_km
        place_resp.match_score = round(total_score * 100, 1)

        scored_places.append((total_score, place_resp))

    # Sort descending by match score
    scored_places.sort(key=lambda x: x[0], reverse=True)
    
    return [p[1] for p in scored_places[:limit]]
