import { useEffect, useMemo, useState } from "react";
import { MONTH_NAMES } from "../constants";
import { useGetHabitDetailByYear } from "./useGetHabitDetailByYear";
import { useDispatch } from "react-redux";
import { addDataSetForYear } from "../features/habits/graphSlice";

function useGetData({ habit, year }) {
  const { habitDetails, isFetchingDetail } = useGetHabitDetailByYear({
    year,
    habit: habit,
  });
  const finalArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let habitData = {};
  if (!isFetchingDetail && habitDetails) {
    const monthNames = MONTH_NAMES;
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

    console.log("FInalArr", finalArr);

    // const dataSet = [
    //   {
    //     label: "Achieved",
    //     data: finalArr.map((data) => data),
    //     backgroundColor: ["#50AF95"],
    //   },
    // ];
    habitData = {
      labels: monthNames.map((monthName) => monthName),
      datasets: [
        {
          label: "Achieved",
          data: finalArr.map((data) => data),
          backgroundColor: ["#50AF95"],
        },
      ],
    };
    return { habitData, isFetchingDetail };
  }
  return { habitData, isFetchingDetail: true };
  //   return { dataSet: [], isFetchingDetail: true };
}

export default useGetData;
