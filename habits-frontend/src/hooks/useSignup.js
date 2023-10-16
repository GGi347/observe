import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (data) => signupApi(data),
    onSuccess: () => {
      // navigate("login", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}
