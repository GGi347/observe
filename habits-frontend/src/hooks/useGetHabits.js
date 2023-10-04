import { useQuery } from "@tanstack/react-query";
import { getHabitList } from "../services/habits";
import { receive } from "../features/habits/habitSlice";
import { useDispatch } from "react-redux";

export function useGetHabits() {
  const dispatch = useDispatch();
  // const queryClient = new QueryClient();
  // queryClient.invalidateQueries("habits");
  const {
    isLoading,
    data: habits,
    error,
  } = useQuery(["habits"], async () => {
    const data = await getHabitList();
    dispatch(receive(data));
    return data;
  });
  if (!isLoading) {
    //console.log("useGetHabits ", habits);
  }
  //const habits = useSelector((store) => store.habits.habits);

  return { isLoading, habits, error, refetch: getHabitList };
}
