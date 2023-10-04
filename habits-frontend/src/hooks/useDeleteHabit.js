import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabits } from "../services/habits";
import toast from "react-hot-toast";

export default function useDeleteHabit() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate: deleteHabit,
    error,
  } = useMutation({
    mutationFn: (habitName) => deleteHabits(habitName),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteHabit, error };
}
