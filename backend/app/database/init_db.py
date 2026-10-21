import logging
from sqlalchemy.orm import Session
from sqlalchemy import inspect, text
from app.database.session import engine, Base, SessionLocal
from app.models.place import Place
from app.models.user import User
from app.core.security import get_password_hash
from app.core.seed_data import SAMPLE_PLACES

logger = logging.getLogger(__name__)


def init_db():
    # Create all database tables
    Base.metadata.create_all(bind=engine)
    inspector = inspect(engine)
    columns = {column["name"] for column in inspector.get_columns("trips")}
    if "selected_place_ids" not in columns:
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE trips ADD COLUMN selected_place_ids TEXT DEFAULT ''"))
    
    db: Session = SessionLocal()
    try:
        # Seed places if database has no places
        existing_places_count = db.query(Place).count()
        if existing_places_count == 0:
            logger.info("Seeding initial places data...")
            for place_dict in SAMPLE_PLACES:
                place = Place(**place_dict)
                db.add(place)
            db.commit()
            logger.info(f"Successfully seeded {len(SAMPLE_PLACES)} destinations and places.")

        # Restore the image URLs shipped with the curated catalogue. Older
        # startup code cleared these on every launch, leaving every seeded
        # destination card without an image.
        seeded_images = {
            item["name"]: item["image_url"]
            for item in SAMPLE_PLACES
            if item.get("image_url")
        }
        for place in db.query(Place).filter(Place.name.in_(seeded_images)).all():
            place.image_url = seeded_images[place.name]
        db.commit()

        # Ensure demo user exists
        demo_user = db.query(User).filter(User.email == "traveler@travelwise.com").first()
        if not demo_user:
            demo_user = User(
                email="traveler@travelwise.com",
                hashed_password=get_password_hash("TravelWise@123"),
                full_name="Demo Traveler",
                home_location="Hyderabad",
                preferred_travel_style="balanced",
                default_budget=5000.0,
                interests="Nature,Food,Sightseeing",
                is_active=True
            )
            db.add(demo_user)
            db.commit()
            logger.info("Demo user 'traveler@travelwise.com' created successfully.")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
