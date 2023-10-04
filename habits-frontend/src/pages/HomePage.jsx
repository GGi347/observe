import { useState } from "react";
import { useGetHabits } from "../hooks/useGetHabits";
import { useDispatch, useSelector } from "react-redux";
import CreateHabitForm from "../ui/CreateHabitForm";
import { useGetHabitDetail } from "../hooks/useGetHabitDetail";
import { addHabitDetails } from "../features/habits/habitSlice";
import Calendar from "../ui/Calendar";
import { decreaseMonth, increaseMonth } from "../features/habits/calendarSlice";
import { useQueryClient } from "@tanstack/react-query";

function HomePage() {
  const habitDetails = useSelector((store) => store.habits.habitDetails);
  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);

  const numOfDays = new Date(year, month + 1, 0).getDate();

  const dispatch = useDispatch();
  const { isLoading, error } = useGetHabits();
  const { habitDetailsQuery } = useGetHabitDetail();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const fullMonth = monthNames[month];
  const [isFormOpen, setIsFormOpen] = useState(false);

  const queryClient = useQueryClient();
  console.log("habit query", habitDetailsQuery.data);

  return (
    <div
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <h3>
        <button
          onClick={async () => {
            queryClient.invalidateQueries({
              queryKey: ["habitDetails", month],
            });
            dispatch(decreaseMonth());
          }}
        >
          👈🏽
        </button>
        {fullMonth}, {year}
        <button
          onClick={async () => {
            queryClient.invalidateQueries({
              queryKey: ["habitDetails", month],
            });
            dispatch(increaseMonth());
          }}
        >
          👉🏽
        </button>
      </h3>
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Calendar numOfDays={numOfDays} />
      )}
      <button onClick={() => setIsFormOpen(true)}>New Habit ➕</button>
      {habitDetailsQuery.data && (
        <ul>
          {habitDetailsQuery.data.map((habitDetail, i) => (
            <li key={i}>{habitDetail.date_today}</li>
          ))}
        </ul>
      )}
      {isFormOpen && (
        <CreateHabitForm setIsFormOpen={setIsFormOpen} numOfDays={numOfDays} />
      )}
    </div>
  );
}

export default HomePage;
