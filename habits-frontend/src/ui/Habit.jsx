import useDeleteHabit from "../hooks/useDeleteHabit";
import { useState } from "react";
import DayContainer from "./DayContainer";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function Habit({ habit, days }) {
  const { isDeleting, deleteHabit } = useDeleteHabit();
  const [isDeleteOn, setIsDeleteOn] = useState(false);
  const [achieved, setAchieved] = useState(0);
  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);
  const date = useMemo(() => new Date(), []);

  // const habits = useSelector((store) => store.habits.habits);

  function handleHabitClick() {
    if (isDeleteOn) deleteHabit(habit.name);
  }
  return (
    <>
      <td
        onMouseEnter={() => setIsDeleteOn(true)}
        onMouseLeave={() => setIsDeleteOn(false)}
        onClick={handleHabitClick}
      >
        {isDeleteOn ? <>🚮</> : habit.name}
      </td>
      {days.map((d) => (
        <DayContainer
          habit={habit}
          key={d}
          day={d}
          date={date}
          setAchieved={setAchieved}
        />
      ))}
      <td>{habit.goal_per_month}</td>
      <td>{achieved}</td>
    </>
  );
}
