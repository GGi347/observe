import { useGetHabitDetailByYear } from "./useGetHabitDetailByYear";

export default function useGetHabitDataByMonth({ habit, year, month }) {
  const { habitDetails, isFetchingDetail } = useGetHabitDetailByYear({
    year,
    habit: habit,
  });
  if (habitDetails && !isFetchingDetail) {
    const dataset = habitDetails.filter((data) => {
      month === new Date(data.date_today).getMonth() + 1;
      console.log("DATA LEN", month, new Date(data.date_today).getMonth() + 1);
    });
    console.log(
      "DaTASET LEN",
      habitDetails,
      dataset,
      dataset?.length,
      habit,
      year,
      month
    );
  }
  return 0;
}
