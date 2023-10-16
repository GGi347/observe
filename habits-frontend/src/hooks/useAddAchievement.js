import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHabitAchievement } from "../services/habits";
import toast from "react-hot-toast";
import { addHabitDetails } from "../features/habits/habitSlice";
import useGetAuthToken from "./useGetAuthToken";
import { useSelector } from "react-redux";

function useAddAchievement() {
  const token = useGetAuthToken();
  const month = useSelector((store) => store.calendar.month);
  const postq = useMutation({
    mutationFn: (data) => addHabitAchievement(token, data),
    onSuccess: (data) => {
      toast.success("Habit achievement", data);
      // queryClient.setQueryData(["habitDetails", 9], (oldData) => {
      //   oldData = [...oldData, variable];
      //   return oldData;
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["habitDetails", month, token],
      // });
    },
    onError: (err) => toast.error(err.message),
  });
  if (postq.status === "success") {
    console.log("success", postq.data);
  }
  return { addAchievement: postq.mutate };
}

export default useAddAchievement;
