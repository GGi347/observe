import { useGetHabits } from "../hooks/useGetHabits";
import { useDispatch, useSelector } from "react-redux";
import CreateHabitForm from "../ui/CreateHabitForm";
import Calendar from "../ui/Calendar";
import { decreaseMonth, increaseMonth } from "../features/habits/calendarSlice";
import { useQueryClient } from "@tanstack/react-query";
import useGetAuthToken from "../hooks/useGetAuthToken";
import { setIsFormOpen } from "../features/habits/miscellaneousSlice";
import MediumButton from "../ui/MediumButton";
import Spinner from "../ui/Spinner";
import { MONTH_NAMES } from "../constants";

function HomePage() {
  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);
  const isFormOpen = useSelector((store) => store.miscellaneous.isFormOpen);
  const token = useGetAuthToken();
  const userId = useSelector((store) => store.user.userId);
  const numOfDays = new Date(year, month + 1, 0).getDate();
  const isFirstUpdate = useSelector((store) => store.user.isFirstUpdate);

  const dispatch = useDispatch();

  const { isLoading, error } = useGetHabits({ token, userId });

  const monthNames = MONTH_NAMES;
  const fullMonth = monthNames[month];

  const queryClient = useQueryClient();
  return isLoading && isFirstUpdate ? (
    <Spinner />
  ) : (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>
        <button
          onClick={async () => {
            queryClient.invalidateQueries({
              queryKey: ["habitDetails", month, token],
            });
            dispatch(decreaseMonth());
          }}
          style={{ outline: "none", margin: "0 8px" }}
        >
          👈🏽
        </button>
        {fullMonth}, {year}
        <button
          onClick={async () => {
            queryClient.invalidateQueries({
              queryKey: ["habitDetails", month, token],
            });
            dispatch(increaseMonth());
          }}
          style={{ outline: "none", margin: "0 8px" }}
        >
          👉🏽
        </button>
      </h3>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Calendar numOfDays={numOfDays} />
      )}
      <MediumButton onClick={() => dispatch(setIsFormOpen(true))}>
        New Habit ➕
      </MediumButton>
      {isFormOpen && (
        <CreateHabitForm setIsFormOpen={setIsFormOpen} numOfDays={numOfDays} />
      )}
    </div>
  );
}

export default HomePage;
