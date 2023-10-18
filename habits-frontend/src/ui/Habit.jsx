import useDeleteHabit from "../hooks/useDeleteHabit";
import { useEffect, useState } from "react";
import DayContainer from "./DayContainer";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useGetHabitDetail } from "../hooks/useGetHabitDetail";
import Spinner from "./Spinner";
import CreateHabitForm from "./CreateHabitForm";
import useEditHabit from "../hooks/useEditHabit";

export default function Habit({ habit, days }) {
  const { isDeleting, deleteHabit } = useDeleteHabit();
  const { isEditing, editHabit } = useEditHabit();
  const [isEditOn, setIsEditOn] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  function handleDeleteClick() {
    if (isEditOn) deleteHabit(habit.name);
  }

  function handleEditClick() {
    if (isEditOn)
      //editHabit(habit.name);
      setIsFormOpen(true);
  }
  return isFetchingDetail ? (
    <Spinner />
  ) : (
    <>
      <td
        onMouseEnter={() => setIsEditOn(true)}
        onMouseLeave={() => setIsEditOn(false)}
        // onClick={handleHabitClick}
        className="habit-info habit-container"
      >
        {isEditOn ? (
          <>
            <span onClick={handleEditClick}>🖉</span>{" "}
            <span onClick={handleDeleteClick}>🗑</span>
          </>
        ) : (
          habit.name
        )}
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

      {/* {isFormOpen && (
        <CreateHabitForm setIsFormOpen={setIsFormOpen} numOfDays={days} />
      )} */}
    </>
  );
}
