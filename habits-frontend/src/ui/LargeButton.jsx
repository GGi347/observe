import styled from "styled-components";

const LargeButtonStyled = styled.button`
  width: 300px;
  height: 60px;
  color: black;
  border-radius: 30px;
  border: 2px solid blue;
  font-size: 1rem;
  text-transform: uppercase;
  margin-top: 32px;
  padding-left: 20px;
  padding-right: 20px;
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

// eslint-disable-next-line react/prop-types
function LargeButton({ children, onClick }) {
  return <LargeButtonStyled onClick={onClick}>{children}</LargeButtonStyled>;
}

export default LargeButton;
