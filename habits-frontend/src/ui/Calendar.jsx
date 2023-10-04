import { useSelector } from "react-redux";
import Habit from "./Habit";
import DayContainer from "./DayContainer";
import { useMemo } from "react";

function Calendar({ numOfDays }) {
  const habits = useSelector((store) => store.habits.habits);
  const month = useSelector((store) => store.calendar.month);
  const year = useSelector((store) => store.calendar.year);

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const startingDay = new Date(year, month, 1).getDay();

  // const date = useMemo(() => new Date(), []);

  const days = Array.from(Array(numOfDays).keys());
  return (
    <table>
      <thead>
        <tr>
          <th rowSpan="2">Habits</th>
          {days.map((d, i) => (
            <th key={i}>{dayNames[(startingDay + d) % 7]}</th>
          ))}
          <th rowSpan="2">Target</th>
          <th rowSpan="2">Achieved</th>
        </tr>
        <tr>
          {days.map((d, i) => (
            <th key={i}>{d + 1}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {habits.map((habit, index) => {
          return (
            <tr key={index}>
              <Habit habit={habit} days={days} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Calendar;
