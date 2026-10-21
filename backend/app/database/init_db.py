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
        # Keep the bundled curated catalogue in sync on startup so existing
        # installations receive corrected names, locations, and new entries.
        legacy_names = {
            "Hyderabadi Dum Biryani Trail": "Mecca Masjid",
            "Baga Beach & Water Sports": "Baga Beach",
            "Fort Aguada & Lighthouse": "Fort Aguada",
            "Palolem Beach & Kayaking": "Palolem Beach",
            "Jal Mahal (Water Palace)": "Jal Mahal Viewpoint",
            "Cubbon Park & Bamboo Groves": "Cubbon Park",
            "Nandi Hills Sunrise Point": "Nandi Hills",
            "Munnar Tea Plantations & Museum": "Tata Tea Museum",
        }
        for place_data in SAMPLE_PLACES:
            current = db.query(Place).filter(Place.name == place_data["name"]).first()
            if not current:
                old_name = next((old for old, new in legacy_names.items() if new == place_data["name"]), None)
                if old_name:
                    current = db.query(Place).filter(Place.name == old_name).first()
            if current:
                for field, value in place_data.items():
                    setattr(current, field, value)
            else:
                db.add(Place(**place_data))
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
