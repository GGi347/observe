import styled from "styled-components";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;

  div {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    min-width: 20%;
    max-width: 50%;
    width: 380px;
    margin-bottom: 1.2rem;

    input {
      font-size: 16px;
      line-height: 1.5;
      padding: 4px 11px;
      letter-spacing: 1px;
      border-radius: 2px;
      border: 1px solid var(--color-grey-500);
    }

    label::before {
      content: "* ";
      color: red;
    }

    label {
      font-weight: 300;
      letter-spacing: 1px;
      font-size: 18px;
    }
  }
  button {
    font-size: 16px;
    cursor: pointer;
    border: 1px solid blue;
    max-width: 80%;
    min-width: 20%;
    width: 360px;
    height: 36px;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: var(--primary-color);
    color: white;
    &:hover {
      background-color: blue;
    }
    &:visited {
      border: none;
    }
    &:active {
      border: none;
    }
  }
`;

function FormStyled({ children, onSubmit }) {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
}

export default FormStyled;
