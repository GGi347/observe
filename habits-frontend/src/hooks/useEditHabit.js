import { useMutation } from "@tanstack/react-query";
import { editHabit } from "../services/habits";
import toast from "react-hot-toast";

function useEditHabit() {
  const { mutate: editHabit, isLoading: isEditing } = useMutation({
    mutationFn: (habit, day, completed) => editHabit(habit, day, completed),
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

export default useEditHabit;
