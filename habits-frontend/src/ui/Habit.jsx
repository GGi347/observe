import useDeleteHabit from "../hooks/useDeleteHabit";
import { useEffect, useState } from "react";
import DayContainer from "./DayContainer";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useGetHabitDetail } from "../hooks/useGetHabitDetail";
import Spinner from "./Spinner";

export default function Habit({ habit, days }) {
  const { isDeleting, deleteHabit } = useDeleteHabit();
  const [isDeleteOn, setIsDeleteOn] = useState(false);

  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);
  const date = useMemo(() => new Date(), []);
  const { habitDetails, isFetchingDetail } = useGetHabitDetail({
    habit: habit.id,
  });
  const [achieved, setAchieved] = useState(0);

  useEffect(
    function () {
      if (habitDetails) {
        setAchieved(habitDetails.length);
      }
    },
    [habitDetails]
  );

  console.log("Habit and acheived", habit, achieved);
  function handleHabitClick() {
    if (isDeleteOn) deleteHabit(habit.name);
  }
  return isFetchingDetail ? (
    <Spinner />
  ) : (
    <>
      <td
        onMouseEnter={() => setIsDeleteOn(true)}
        onMouseLeave={() => setIsDeleteOn(false)}
        onClick={handleHabitClick}
        className="habit-info habit-container"
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
          achieved={achieved}
          habitDetails={habitDetails}
        />
      ))}
      <td className="habit-info">{habit.goal_per_month}</td>
      <td className="habit-info">{achieved}</td>
    </>
  );
}
