import { Line } from "react-chartjs-2";
import useGetAllData from "../../hooks/useGetAllData";
import Spinner from "../Spinner";

function LineGraph({ habits, selectedYear }) {
  const { habitAllData, isFetchingAllDetail } = useGetAllData({
    habits: habits,
    year: selectedYear,
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `All Habits Performed in the year ${selectedYear}`,
        fontSize: "2rem",
        color: "black",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of Days",
        },
        max: 31,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return isFetchingAllDetail ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: " 40px 5%",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        background: "#f1f3f7c9",
        padding: "20px",
      }}
    >
      <Line
        data={habitAllData}
        options={options}
        style={{ margin: "auto" }}
      ></Line>
    </div>
  );
}

export default LineGraph;
