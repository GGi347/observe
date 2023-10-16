import { useQuery } from "@tanstack/react-query";
import { getHabitList } from "../services/habits";
import { receive } from "../features/habits/habitSlice";
import { useDispatch, useSelector } from "react-redux";
import useGetAuthToken from "./useGetAuthToken";

export function useGetHabits() {
  const dispatch = useDispatch();
  // const queryClient = new QueryClient();
  // queryClient.invalidateQueries("habits");
  const token = useGetAuthToken();
  const userId = useSelector((store) => store.user.userId);
  const {
    isLoading,
    data: habits,
    error,
  } = useQuery(["habits", token], async () => {
    const data = await getHabitList({ token, userId });

    dispatch(receive(data));
    return data;
  });
  if (!isLoading) {
    //console.log("useGetHabits ", habits);
  }
  //const habits = useSelector((store) => store.habits.habits);

  return { isLoading, habits, error, refetch: getHabitList };
}
