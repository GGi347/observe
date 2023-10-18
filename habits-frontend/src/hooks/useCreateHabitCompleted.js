import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabitCompletion } from "../services/habits";
import toast from "react-hot-toast";
import { addHabitDetails } from "../features/habits/habitSlice";
import useGetAuthToken from "./useGetAuthToken";
import { useSelector } from "react-redux";

function useCreateHabitCompleted() {
  const queryClient = useQueryClient();
  const token = useGetAuthToken();
  const month = useSelector((store) => store.calendar.month);
  const postq = useMutation({
    mutationFn: async (data) => await createHabitCompletion(token, data),
    onSuccess: (data) => {
      toast.success("Habit Created", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating: false, createHabitCompleted: postq.mutate };
}

export default useCreateHabitCompleted;
