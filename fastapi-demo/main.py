from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String

from database import Base, engine, SessionLocal

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Менин API Документациям",
    description="PostgreSQL базасы менен иштеген Swagger API",
    version="1.0.0",
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)


@app.get("/")
def root():
    return {"message": "API иштеп жатат"}


@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@app.post("/users")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    user = User(name=name, email=email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
