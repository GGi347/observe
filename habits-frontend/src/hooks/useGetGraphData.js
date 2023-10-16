// import { MONTH_NAMES } from "../constants";
// import { useGetHabitDetailByYear } from "./useGetHabitDetailByYear";

// function useGetGraphData({ year, habit }) {
//   console.log("YEar", year, habit);
//   const { habitDetails, isFetchingDetail } = useGetHabitDetailByYear({
//     year,
//     habit: habit,
//   });
//   const finalArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//   if (!isFetchingDetail && habitDetails) {
//     const groupedByMonth = habitDetails.reduce((acc, data) => {
//       const month = new Date(data.date_today).getMonth();
//       (acc[month] = acc[month] || []).push(data);
//       return acc;
//     }, {});

//     console.log("GBM:", groupedByMonth);

//     const resultArray = Object.values(groupedByMonth);
//     console.log(resultArray);

//     for (let month of resultArray) {
//       const m = new Date(month[0].date_today).getMonth();
//       console.log("M", m);
//       finalArr.splice(m + 1, 1, month.length);
//     }

//     console.log("FInalArr", finalArr);

//     const habitData = {
//       label: "Achieved",
//       data: finalArr.map((data) => data),
//       backgroundColor: ["#50AF95"],
//     };

//     return { habitData };
//   }

// }

// export default useGetGraphData;
