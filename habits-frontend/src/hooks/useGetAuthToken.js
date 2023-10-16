import { useSelector } from "react-redux";

function useGetAuthToken() {
  const tokens = useSelector((store) => store.user.tokens);

  return tokens?.access;
}

export default useGetAuthToken;
