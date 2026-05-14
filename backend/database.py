from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# =========================
# DATABASE CONFIG
# =========================

DATABASE_URL = "sqlite:///./autothreatops.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "check_same_thread": False
    }
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# =========================
# DATABASE DEPENDENCY
# =========================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()