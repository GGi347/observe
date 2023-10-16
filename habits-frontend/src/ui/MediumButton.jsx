import styled from "styled-components";

const MediumButtonStyled = styled.button`
  width: 180px;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
  margin: 1.2rem;
  color: white;
  background-color: var(--primary-color);
  border: 3px solid black;
  text-transform: uppercase;
  margin: 32px 0;
  padding-left: 20px;
  padding-right: 20px;
  &:hover {
    border-color: blue;
  }
`;

// eslint-disable-next-line react/prop-types
function MediumButton({ children, onClick }) {
  return <MediumButtonStyled onClick={onClick}>{children}</MediumButtonStyled>;
}

export default MediumButton;
