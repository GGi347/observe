import { useMutation } from "@tanstack/react-query";
import { editHabitCompletion } from "../services/habits";
import toast from "react-hot-toast";

function useEditHabitCompleted() {
  const { mutate: editHabit, isLoading: isEditing } = useMutation({
    mutationFn: (habit, day, completed) =>
      editHabitCompletion(habit, day, completed),
    onSuccess: () => {
      toast.success("Habit edited");
      // queryClient.invalidateQueries({
      //   queryKey: ["cabins"],
      // });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editHabit };
}

export default useEditHabitCompleted;
