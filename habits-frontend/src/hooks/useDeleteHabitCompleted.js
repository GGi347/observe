import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabitCompleted as deleteHabitCompletedApi } from "../services/habits";
import toast from "react-hot-toast";

function useDeleteHabitCompleted() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate: deleteHabitCompleted,
    data,
  } = useMutation({
    mutationFn: async (data) => await deleteHabitCompletedApi(data),
    onSuccess: (data, variable) => {
      toast.success("Habit deleted");
      // queryClient.setQueryData(["habitDetails", 9], (oldData) => {
      //   oldData = oldData.filter(
      //     (item) =>
      //       item.habit === variable.habit && variable.date !== item.date_today
      //   );
      //   return oldData;
      // });

      // queryClient.invalidateQueries({
      //   queryKey: ["habitDetails", 9],
      // });
      console.log("Dkekete", variable);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteHabitCompleted, data };
}

export default useDeleteHabitCompleted;
