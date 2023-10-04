import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabitCompletion } from "../services/habits";
import toast from "react-hot-toast";
import { addHabitDetails } from "../features/habits/habitSlice";

function useCreateHabitCompleted() {
  const queryClient = useQueryClient();
  const postq = useMutation({
    mutationFn: createHabitCompletion,
    onSuccess: (data, variable) => {
      toast.success("Habit Created", data);
      // queryClient.setQueryData(["habitDetails", 9], (oldData) => {
      //   oldData = [...oldData, variable];
      //   return oldData;
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["habitDetails", 9],
      //   exact: true,
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
