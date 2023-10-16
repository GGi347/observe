import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import useGetAuthToken from "../hooks/useGetAuthToken";
import { useGetHabitDetail } from "../hooks/useGetHabitDetail";
import { useGetHabitDetailByYear } from "../hooks/useGetHabitDetailByYear";
import { MONTH_NAMES } from "../constants";
import useGetData from "../hooks/useGetData";
import Spinner from "../ui/Spinner";
import { useGetHabits } from "../hooks/useGetHabits";
import styled from "styled-components";
import { useLocation } from "react-router";
import useGetAllData from "../hooks/useGetAllData";
import useGetHabitDataByMonth from "../hooks/useGetHabitDataByMonth";
import percentage from "../constants/percentage";
import BarGraph from "../ui/Graphs/BarGraph";
import PieGraph from "../ui/Graphs/PieGraph";
import LineGraph from "../ui/Graphs/LineGraph";
import HeadingStyle from "../ui/HeadingStyle";

const LabelStyle = styled.select`
  width: 160px;
  height: 30px;
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: black;
  background-color: #e5e7eb;
  margin: 2rem;
  cursor: pointer;
`;

function ChartsPage() {
  const location = useLocation();
  const { state } = location;
  const habits = state.habits;

  const username = useSelector((store) => store.user.username);
  const year = new Date().getFullYear();
  const [habit, setHabit] = useState(habits[0]?.id);
  console.log("habit", habit);
  const [selectedYear, setSelectedYear] = useState(year);
  const years = [year, year - 1, year - 2, year - 3, year - 4];

  const currHabitTarget = habits.find(
    (data) => Number(data.id) === Number(habit)
  )?.goal_per_month;

  function handleBtnClick() {}

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <HeadingStyle>Hello, {username}! Here is your habit report.</HeadingStyle>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          background: "#f1f3f7c9",
          marginTop: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <LabelStyle
            value={habit}
            onChange={(e) => {
              setHabit(e.target.value);
              handleBtnClick();
            }}
          >
            {habits.map((habit, i) => (
              <option key={i} value={habit.id}>
                {habit.name}
              </option>
            ))}
          </LabelStyle>
          <LabelStyle
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);

              handleBtnClick();
            }}
          >
            {years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </LabelStyle>
        </div>
        <div
          style={{
            display: "flex ",
            padding: "20px",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <BarGraph selectedYear={selectedYear} habit={habit} />
          <PieGraph habit={habit} currHabitTarget={currHabitTarget} />
        </div>
      </div>
      <LineGraph selectedYear={selectedYear} habits={habits} />
    </div>
  );
}

export default ChartsPage;
