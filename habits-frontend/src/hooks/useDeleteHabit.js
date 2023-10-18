import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabits } from "../services/habits";
import toast from "react-hot-toast";
import useGetAuthToken from "./useGetAuthToken";

export default function useDeleteHabit() {
  const queryClient = useQueryClient();
  const token = useGetAuthToken();
  const {
    isLoading: isDeleting,
    mutate: deleteHabit,
    error,
  } = useMutation({
    mutationFn: (habitName) => deleteHabits(token, habitName),

    onSuccess: (variable) => {
      toast.success("Habit deleted");
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteHabit, error };
}
