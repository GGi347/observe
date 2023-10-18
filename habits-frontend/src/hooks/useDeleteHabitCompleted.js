import { useMutation } from "@tanstack/react-query";
import { deleteHabitCompleted as deleteHabitCompletedApi } from "../services/habits";
import toast from "react-hot-toast";
import useGetAuthToken from "./useGetAuthToken";

function useDeleteHabitCompleted() {
  const token = useGetAuthToken();

  const {
    isLoading: isDeleting,
    mutate: deleteHabitCompleted,
    data,
  } = useMutation({
    mutationFn: async (data) => await deleteHabitCompletedApi(token, data),
    onSuccess: () => {
      toast.success("Habit deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteHabitCompleted, data };
}

export default useDeleteHabitCompleted;
