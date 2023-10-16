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
    mutationFn: (data) => createHabitCompletion(token, data),
    onSuccess: (data, variable) => {
      toast.success("Habit Created", data);
      // queryClient.setQueryData(["habitDetails", 9], (oldData) => {
      //   oldData = [...oldData, variable];
      //   return oldData;
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["habitDetails", month, token],
      // });
      console.log("CREATE", data);
    },
    onError: (err) => toast.error(err.message),
  });
  if (postq.status === "success") {
    console.log("success", postq.data);
  }
  return { isCreating: false, createHabitCompleted: postq.mutate };
}

export default useCreateHabitCompleted;
