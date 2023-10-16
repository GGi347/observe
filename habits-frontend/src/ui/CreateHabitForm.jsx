import { useState } from "react";
import { useCreateHabit } from "../hooks/useCreateHabit";
import { useGetHabits } from "../hooks/useGetHabits";
import toast from "react-hot-toast";
import useGetAuthToken from "../hooks/useGetAuthToken";
import FormStyled from "./FormStyled";
import PopupForm from "./PopupForm";
import HeadingStyle from "./HeadingStyle";
import { useDispatch } from "react-redux";

function CreateHabitForm({ setIsFormOpen, numOfDays }) {
  const { createHabit } = useCreateHabit();
  const { refetch } = useGetHabits();
  const dispatch = useDispatch();
  const [habitName, setHabitName] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");
  const [durationType, setDurationType] = useState("minutes");

  function validateForm() {
    console.log("setTrue");
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

  function handleFormSubmit(e) {
    e.preventDefault();
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
    dispatch(setIsFormOpen(false));
  }

  return (
    <PopupForm onSubmit={handleFormSubmit}>
      <h3 className="form-header">Add New Habit</h3>
      <title>Add New Habit 🤗</title>
      <div>
        <label className="required">Habit Name</label>
        <input
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
      </div>
      <div>
        <label className="required">Goal (Number of sessions per month)</label>
        <input value={goal} onChange={(e) => setGoal(e.target.value)} />
      </div>
      <div>
        <label>Duration per Session</label>
        <div className="select-container">
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="seconds">Seconds</option>
          </select>
        </div>
      </div>

      <input type="submit" className="popupButton" />
      <button
        className="popupButton"
        onClick={() => dispatch(setIsFormOpen(false))}
      >
        close
      </button>
    </PopupForm>
  );
}

export default CreateHabitForm;
