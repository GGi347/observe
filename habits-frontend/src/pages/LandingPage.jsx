import LargeButton from "../ui/LargeButton";
import img1 from "../images/observe1.png";
import styled from "styled-components";
import HeadingStyle from "../ui/HeadingStyle";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFirstUpdate } from "../features/habits/userSlice";

const Feature = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
`;

const FeatureRow = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  background-color: var(--primary-color);
  padding: 60px 10%;
  background-color: ${(props) =>
    props.type === "odd" ? "var(--color-grey-100)" : "var(--color-grey-50)"};
`;

const FeatureImg = styled.div`
  max-width: 400px;
  height: auto;
`;

const FeatureContent = styled.div`
  max-width: 40%;
  text-align: center;
`;

const LandingHeader = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4%;
`;
function LandingPage() {
  const navigate = useNavigate();
  const tokens = useSelector((store) => store.user.tokens);
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (tokens) {
        console.log("TOKENS", tokens);

        navigate("home");
      }
    },
    [tokens, navigate, dispatch]
  );
  return (
    <>
      <LandingHeader>
        <HeadingStyle>
          The journey of a thousand miles begins with a single step.
        </HeadingStyle>
        <LargeButton onClick={() => navigate("/login")}>
          Take the Step
        </LargeButton>
      </LandingHeader>

      <Feature>
        <ul>
          <FeatureRow type="odd">
            <FeatureContent>
              <h3>Set The Goals</h3>
              <p>
                Streaks break, because life happens. But don&apos;t let that
                stop your progress.
              </p>
              <br></br>
              <p>
                Goals are based on flexible consistency, which makes it okay to
                fail sometimes. It&apos;s more important that you continue doing
                your habit.
              </p>
            </FeatureContent>
            <FeatureImg>
              <img src={img1} />
            </FeatureImg>
          </FeatureRow>

          <FeatureRow>
            <FeatureImg>
              <img src={img1} />
            </FeatureImg>
            <FeatureContent>
              <h3>Set The Goals</h3>
              <p>
                Streaks break, because life happens. But don&apos;t let that
                stop your progress.
              </p>
              <br></br>
              <p>
                Goals are based on flexible consistency, which makes it okay to
                fail sometimes. It&apos;s more important that you continue doing
                your habit.
              </p>
            </FeatureContent>
          </FeatureRow>
        </ul>
      </Feature>
    </>
  );
}

export default LandingPage;
