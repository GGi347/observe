import { QueryClient, useQuery } from "@tanstack/react-query";
import { getHabitDetailByYear } from "../services/habits";
import useGetAuthToken from "./useGetAuthToken";
import { useSelector } from "react-redux";

export function useGetHabitDetailByYear({ habit, year }) {
  //const dispatch = useDispatch();

  const token = useGetAuthToken();
  const { data: habitDetails, isLoading } = useQuery({
    queryKey: ["habitDetailsByYear", year, token, habit],
    queryFn: async () => {
      console.log("From inside", year, habit);
      return await getHabitDetailByYear({ year, habit, token });
    },
  });
  console.log("enters this", habitDetails);
  return { habitDetails, isLoading };
}
