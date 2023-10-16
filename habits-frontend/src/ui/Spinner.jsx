import { SpinnerCircular } from "spinners-react";

function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SpinnerCircular enabled={true} color="blue" size={40} />
    </div>
  );
}

export default Spinner;
