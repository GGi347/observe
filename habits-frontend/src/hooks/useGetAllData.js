import { useEffect, useMemo, useState } from "react";
import { MONTH_NAMES } from "../constants";
import { useGetAllHabitDetailByYear } from "./useGetAllHabitDetailByYear";
import { useDispatch } from "react-redux";
import { addDataSetForYear } from "../features/habits/graphSlice";
import useGetAuthToken from "./useGetAuthToken";
import { useQuery } from "@tanstack/react-query";
import {
  getAllHabitDetailByYear,
  getHabitDetailByYear,
} from "../services/habits";

function useGetAllData({ habits, year }) {
  console.log("YEar", year, habits);
  const token = useGetAuthToken();
  const monthNames = MONTH_NAMES;

  const dataSet = [];

  const { allHabits, isFetchingDetail } = useGetAllHabitDetailByYear({
    habits,
    year,
  });

  console.log("HOOK HB", allHabits, isFetchingDetail);
  if (!isFetchingDetail && allHabits) {
    for (let habitDetails of allHabits) {
      const finalArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      const groupedByMonth = habitDetails.reduce((acc, data) => {
        const month = new Date(data.date_today).getMonth();
        (acc[month] = acc[month] || []).push(data);
        return acc;
      }, {});

      console.log("GBM:", groupedByMonth);

      const resultArray = Object.values(groupedByMonth);
      console.log(resultArray);

      for (let month of resultArray) {
        const m = new Date(month[0].date_today).getMonth();
        console.log("M", m);
        finalArr.splice(m + 1, 1, month.length);
      }

      dataSet.push({
        label: habits.find((habit) => habit.id === habitDetails[0]?.habit)
          ?.name,
        data: finalArr.map((data) => data),
        backgroundColor: ["#50AF95", "#ffa600", "#a01b68"],
        borderColor: ["#50AF95", "#ffa600", "#a01b68"],
      });
    }

    const habitAllData = {
      labels: monthNames.map((monthName) => monthName),
      datasets: dataSet,
    };
    return { habitAllData, isFetchingAllDetail: isFetchingDetail };
  }
  return { habitAllData: {}, isFetchingAllDetail: true };
}

export default useGetAllData;
