import { useDispatch, useSelector } from "react-redux";
import { dateToString } from "../constants/DateUtil";
import useCreateHabitCompleted from "../hooks/useCreateHabitCompleted";
import { addHabitDetails } from "../features/habits/habitSlice";
import { useGetHabitDetail } from "../hooks/useGetHabitDetail";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import useDeleteHabitCompleted from "../hooks/useDeleteHabitCompleted";
import toast from "react-hot-toast";
import useGetAuthToken from "../hooks/useGetAuthToken";
import { setIsCurrDate } from "../features/habits/calendarSlice";

function DayContainer({
  habit,
  day,
  date,
  setAchieved,
  achieved,
  habitDetails,
}) {
  // const habitDetails = useSelector((store) => store.habits.habitDetails);
  const dispatch = useDispatch();
  const token = useGetAuthToken();

  const { isCreating, createHabitCompleted } = useCreateHabitCompleted();
  const { isDeleting, deleteHabitCompleted, data } = useDeleteHabitCompleted();

  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);
  const isCurrDate = useSelector((store) => store.calendar.isCurrDate);

  const [isClickable, setIsClickable] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const queryClient = useQueryClient();

  async function handleDayClick(day, habit) {
    if (!isClickable) return;
    const completed = true;
    const d = dateToString(year, month, day);
    console.log("ISCHECKEDINITIAL", isChecked);
    if (isChecked) {
      setIsChecked(false);
      deleteHabitCompleted({ habit, date: d });
      setAchieved((achieved) => achieved - 1);
      return;
    }
    setIsChecked(true);
    console.log("ENTERS in is check", isChecked);
    createHabitCompleted({
      habit,
      date: d,
      completed: completed,
    });
    setAchieved((achieved) => achieved + 1);
    // addAchievement({ habit, year, month, achieved });

    console.log("ISCHECKED", isChecked);
  }
  useEffect(
    function () {
      if (month < date.getMonth() && year <= date.getFullYear()) {
        setIsClickable(true);
      } else if (
        month === date.getMonth() &&
        year === date.getFullYear() &&
        day + 1 <= date.getDate()
      ) {
        setIsClickable(true);
      } else {
        setIsClickable(false);
      }
    },
    [date, month, year, day]
  );

  useEffect(
    function () {
      setIsChecked(false);
      if (month > date.getMonth()) {
        setIsChecked(false);
      } else if (habitDetails === undefined) {
        setIsChecked(false);
      } else if (habitDetails.length <= 0) {
        setIsChecked(false);
      } else {
        for (let habitDetail of habitDetails) {
          if (
            habitDetail.habit === habit.id &&
            habitDetail.date_today === dateToString(year, month, day + 1)
          ) {
            setIsChecked(true);

            return;
          }
        }
      }
    },
    [day, month, year, habitDetails, date, habit.id]
  );

  // useEffect(
  //   function () {
  //     dispatch(setIsCurrDate(day));
  //     console.log("currdata", isCurrDate, day);
  //   },
  //   [day, dispatch]
  // );

  return (
    <td
      onClick={() => handleDayClick(day + 1, habit.id)}
      className={`${isClickable ? "clickable" : "unclickable"} ${
        isCurrDate ? "curr-date" : ""
      }`}
    >
      {typeof habitDetails !== "undefined" &&
        habitDetails.length !== 0 &&
        isChecked && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              color: "green",
              fontWeight: "bold",
              fontFamily: "sansSerif",
            }}
          >
            ✔
          </span>
        )}
    </td>
  );
}

export default DayContainer;
