import { Pie } from "react-chartjs-2";
import { useGetHabitDetail } from "../../hooks/useGetHabitDetail";
import { useSelector } from "react-redux";
import percentage from "../../constants/percentage";

function PieGraph({ habit, currHabitTarget }) {
  const { habitDetails } = useGetHabitDetail({ habit });

  const completed = habitDetails?.length;

  let currPercentage = Math.round(percentage(completed, currHabitTarget));
  currPercentage = currPercentage > 100 ? 100 : currPercentage;

  const singleData = {
    labels: ["Completed", "Target"].map((monthName) => monthName),
    datasets: [
      {
        data: [completed, currHabitTarget].map((data) => data),
        backgroundColor: ["#50AF95", "white"],
      },
    ],
  };
  return (
    <div
      style={{
        margin: " 10px 5% 36px 5%",
        width: "300px",
        maxWidth: "60%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "1.6rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>{currPercentage}%</h2>
        <p>Completed This Month</p>
      </div>
      <Pie data={singleData} style={{}}></Pie>
    </div>
  );
}

export default PieGraph;
