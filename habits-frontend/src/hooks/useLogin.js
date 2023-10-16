import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function useLogin() {
  const navigate = useNavigate();
  const isFirstUpdate = useSelector((store) => store.user.isFirstUpdate);
  const {
    mutate: login,
    isLoading,
    status,
  } = useMutation({
    mutationFn: ({ username, password, dispatch }) =>
      loginApi({ username, password, dispatch }),
    // onSuccess: () => {
    //   console.log("USERLOGIN", isFirstUpdate);
    //   if (!isFirstUpdate) {
    //     navigate("/home");
    //   }
    // },
    onError: (err) => toast.error(err.message),
  });

  if (status === "success") {
    navigate("/home", { replace: true });
  }

  return { login, isLoading, status };
}
