import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabitCompleted as deleteHabitCompletedApi } from "../services/habits";
import toast from "react-hot-toast";
import useGetAuthToken from "./useGetAuthToken";
import { useSelector } from "react-redux";

function useDeleteHabitCompleted() {
  const queryClient = useQueryClient();
  const token = useGetAuthToken();
  const month = useSelector((store) => store.calendar.month);
  const {
    isLoading: isDeleting,
    mutate: deleteHabitCompleted,
    data,
  } = useMutation({
    mutationFn: async (data) => await deleteHabitCompletedApi(token, data),
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
      //   queryKey: ["habitDetails", month, token],
      // });
      console.log("Dkekete", variable);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteHabitCompleted, data };
}

export default useDeleteHabitCompleted;
