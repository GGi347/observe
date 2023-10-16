import { QueryClient, useQuery } from "@tanstack/react-query";
import { getHabitDetail as getHabitDetailApi } from "../services/habits";
import { useDispatch, useSelector } from "react-redux";
import { addHabitDetails } from "../features/habits/habitSlice";
import toast from "react-hot-toast";
import CreateHabitForm from "../ui/CreateHabitForm";
import useGetAuthToken from "./useGetAuthToken";

export function useGetHabitDetail({ habit }) {
  //const dispatch = useDispatch();
  const month = useSelector((store) => store.calendar.month);
  const token = useGetAuthToken();

  const { data: habitDetails, isLoading: isFetchingDetail } = useQuery({
    queryKey: ["habitDetails", month, token, habit],
    queryFn: async () => {
      return await getHabitDetailApi({ month, habit, token });
    },
  });
  return { habitDetails, isFetchingDetail };
}
