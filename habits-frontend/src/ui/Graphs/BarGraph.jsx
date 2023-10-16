import { Bar } from "react-chartjs-2";
import Spinner from "../Spinner";
import useGetData from "../../hooks/useGetData";

function BarGraph({ habit, selectedYear }) {
  const { habitData, isFetchingDetail } = useGetData({
    habit: habit,
    year: selectedYear,
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Habit Performed in the year ${selectedYear}`,
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

  return isFetchingDetail ? (
    <Spinner />
  ) : (
    <div
      style={{
        margin: " 10px 5% 36px 5%",
        width: "800px",
        maxWidth: "90%",
      }}
    >
      <Bar
        data={habitData}
        options={options}
        style={{ width: "100%", height: "auto" }}
      ></Bar>
    </div>
  );
}

export default BarGraph;
