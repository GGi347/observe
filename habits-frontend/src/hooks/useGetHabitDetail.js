import { QueryClient, useQuery } from "@tanstack/react-query";
import { getHabitDetail as getHabitDetailApi } from "../services/habits";
import { useDispatch, useSelector } from "react-redux";
import { addHabitDetails } from "../features/habits/habitSlice";
import toast from "react-hot-toast";
import CreateHabitForm from "../ui/CreateHabitForm";

export function useGetHabitDetail() {
  const dispatch = useDispatch();
  const month = useSelector((store) => store.calendar.month);

  const habitDetailsQuery = useQuery({
    queryKey: ["habitDetails", month],
    queryFn: async () => {
      console.log("MONTH", month);
      return await getHabitDetailApi(month);
    },

    //onSuccess: (data) => dispatch(addHabitDetails(data)),

    // onError: (err) => toast.error("Error getting data details", err.message),
  });

  // if (habitDetailsQuery.data !== undefined) {
  //   console.log("not undefined", habitDetailsQuery.fetchStatus);
  //   dispatch(addHabitDetails(habitDetailsQuery.data));
  // }
  // if (habitDetailsQuery.isFetched) {
  //dispatch(addHabitDetails(habitDetailsQuery.data));
  // }

  return { habitDetailsQuery };
}
