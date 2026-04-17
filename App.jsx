import { useEffect, useState } from "react";

const API = "https://DEIN-BACKEND.onrender.com/api";

export default function App() {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  useEffect(() => {
    fetch(API + "/exercises")
      .then(r => r.json())
      .then(setExercises);

    fetch(API + "/workouts")
      .then(r => r.json())
      .then(setWorkouts);
  }, []);

  const addWorkout = async () => {
    await fetch(API + "/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercise_name: selected,
        weight,
        reps
      })
    });

    window.location.reload();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🏋️ Gym Tracker</h1>

      <h3>Übungen</h3>
      {exercises.map((e, i) => (
        <div key={i} onClick={() => setSelected(e.name)}>
          {e.name} ({e.muscle})
        </div>
      ))}

      <hr />

      <h3>Ausgewählt: {selected}</h3>

      <input placeholder="Gewicht" onChange={e => setWeight(e.target.value)} />
      <input placeholder="Reps" onChange={e => setReps(e.target.value)} />

      <button onClick={addWorkout}>Speichern</button>

      <hr />

      <h3>Workouts</h3>
      {workouts.map((w, i) => (
        <div key={i}>
          {w.exercise_name} - {w.weight}kg x {w.reps}
        </div>
      ))}
    </div>
  );
}
