import { useQuery } from "@tanstack/react-query";
import { getHabitAchievementApi } from "../services/habits";
import useGetAuthToken from "./useGetAuthToken";
import { useSelector } from "react-redux";

function useGetHabitAchievement({ habit }) {
  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);
  const token = useGetAuthToken();
  const { data: habitAchievement, isLoading: isFetchingDetail } = useQuery({
    queryKey: ["habitAchievement", month, token, habit, year],
    queryFn: async () => {
      return await getHabitAchievementApi({ month, year, habit, token });
    },
  });
  console.log("hook", habitAchievement);
  return { habitAchievement, isFetchingDetail };
}

export default useGetHabitAchievement;
