import { useSelector } from "react-redux";
import Habit from "./Habit";
import DayContainer from "./DayContainer";
import { useMemo } from "react";
import Spinner from "./Spinner";

function Calendar({ numOfDays }) {
  const habits = useSelector((store) => store.habits.habits);
  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);
  const isCurrDate = useSelector((store) => store.calendar.isCurrrDate);

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const startingDay = new Date(year, month, 1).getDay();

  // const date = useMemo(() => new Date(), []);

  const days = Array.from(Array(numOfDays).keys());
  return (
    <table
      style={{
        display: "inlineBlock",
        minWidth: "90%",
        margin: "1.2rem",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th rowSpan="2" className="habit-info habit-container">
            Habits
          </th>
          {days.map((d, i) => (
            <th
              key={i}
              className={`${isCurrDate ? "curr-date-header" : "habit-days"}`}
            >
              {dayNames[(startingDay + d) % 7]}
            </th>
          ))}
          <th rowSpan="2" className="habit-info">
            Target
          </th>
          <th rowSpan="2" className="habit-info">
            Achieved
          </th>
        </tr>
        <tr className="habit-days">
          {days.map((d, i) => (
            <th key={i} className={isCurrDate ? "curr-date-header" : ""}>
              {d + 1}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {habits.length === 0 ? (
          <Spinner />
        ) : (
          habits.map((habit, index) => {
            return (
              <tr key={index}>
                <Habit habit={habit} days={days} />
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default Calendar;
