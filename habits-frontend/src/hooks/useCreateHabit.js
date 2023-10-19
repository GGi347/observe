import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabit as createHabitApi } from "../services/habits";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useGetAuthToken from "./useGetAuthToken";

export function useCreateHabit() {
  const queryClient = useQueryClient();
  const token = useGetAuthToken();

  const { mutate: createHabit, isLoading: isCreating } = useMutation({
    mutationFn: (habit) => createHabitApi(token, habit, queryClient),
    onSuccess: () => {
      toast.success("Habit created successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createHabit };
}
