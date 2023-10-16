import { QueryClient, useQuery } from "@tanstack/react-query";
import { getAllHabitDetailByYear } from "../services/habits";
import useGetAuthToken from "./useGetAuthToken";
import { useSelector } from "react-redux";

export function useGetAllHabitDetailByYear({ habits, year }) {
  //const dispatch = useDispatch();

  const token = useGetAuthToken();
  const { data: allHabits, isLoading: isFetchingDetail } = useQuery({
    queryKey: ["allhabitDetailsByYear", year, token, habits],
    queryFn: async () => {
      return await getAllHabitDetailByYear({ year, habits, token });
    },
  });

  return { allHabits, isFetchingDetail };
}
