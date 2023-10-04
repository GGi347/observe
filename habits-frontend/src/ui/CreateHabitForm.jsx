import { useState } from "react";
import { useCreateHabit } from "../hooks/useCreateHabit";
import { useGetHabits } from "../hooks/useGetHabits";
import toast from "react-hot-toast";

function CreateHabitForm({ setIsFormOpen, numOfDays }) {
  const { createHabit } = useCreateHabit();

  const { refetch } = useGetHabits();

  const [habitName, setHabitName] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");
  const [durationType, setDurationType] = useState("minutes");

  function validateForm() {
    if (habitName.length === 0 || goal.length === 0) {
      toast.error("Empty fields must be filled.");
      return false;
    }
    const numGoal = parseInt(goal);
    const numDuration = Number(duration);
    if (isNaN(numGoal)) {
      toast.error("Goal should be a number.");
      return false;
    }
    if (isNaN(numDuration)) {
      toast.error("Duration should be a number.");
      return false;
    }
    if (durationType === "hours" && numDuration > 24) {
      toast.error("Duration value exceeded 24 hours");
      return false;
    }
    if (numGoal > numOfDays) {
      toast.error("Goals should be less than or equal to days in the month");
      return false;
    }
    return true;
  }

  function getFormattedDuration() {
    const numDuration = Number(duration);
    if (durationType === "hours") {
      return numDuration * 3600;
    }
    if (durationType === "minutes") {
      return numDuration * 60;
    }
    return numDuration;
  }

  function handleFormSubmit() {
    const isValid = validateForm();

    if (isValid) {
      const formattedDuration = getFormattedDuration();
      console.log("FD", formattedDuration);
      createHabit({ habitName, duration: formattedDuration, goal });
      console.log({ habitName, duration: formattedDuration, goal });
      setIsFormOpen(false);
      //refetch();
    } else {
      setHabitName("");
      setGoal("");
      setDuration("");
      // toast.error("Form is invalid.");
    }
  }

  return (
    <form
      style={{
        backgroundColor: "white",
        position: "absolute",
        alignSelf: "center",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <title>Add New Habit 🤗</title>
      <div>
        <label>Habit Name</label>
        <input
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
      </div>
      <div>
        <label>Duration per Session</label>
        <input value={duration} onChange={(e) => setDuration(e.target.value)} />
        <select
          value={durationType}
          onChange={(e) => setDurationType(e.target.value)}
        >
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="seconds">Seconds</option>
        </select>
      </div>
      <div>
        <label>Goal (Number of sessions per month)</label>
        <input value={goal} onChange={(e) => setGoal(e.target.value)} />
      </div>
      <input type="submit" />
      <button onClick={() => setIsFormOpen(false)}>close</button>
    </form>
  );
}

export default CreateHabitForm;
