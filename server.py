from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXERCISES = [
    {"name": "Bankdrücken", "muscle": "Brust"},
    {"name": "Kniebeugen", "muscle": "Beine"},
    {"name": "Kreuzheben", "muscle": "Rücken"},
    {"name": "Schulterdrücken", "muscle": "Schultern"},
]

workouts = []

@app.get("/api/exercises")
def get_exercises():
    return EXERCISES

@app.get("/api/workouts")
def get_workouts():
    return workouts

@app.post("/api/workouts")
def add_workout(workout: dict):
    workouts.append(workout)
    return {"status": "ok"}
