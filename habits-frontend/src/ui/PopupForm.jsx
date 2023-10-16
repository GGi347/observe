import styled from "styled-components";

const PopupFormStyle = styled.form`
  background-color: white;
  position: absolute;
  align-self: center;
  padding: 2rem;

  .form-header {
    font-size: 18px;
    margin-bottom: 12px;
  }

  div {
    display: flex;
    flex-direction: column;
    min-width: 20%;
    width: 380px;
    margin-bottom: 1.2rem;

    input {
      line-height: 1.5;
      padding: 4px 11px;
      letter-spacing: 1px;
      border-radius: 2px;
      border: 1px solid var(--color-grey-500);
    }

    .required::before {
      content: "* ";
      color: red;
    }

    label {
      font-weight: 300;
      letter-spacing: 1px;
      font-size: 16px;
    }
  }
  button {
    margin-left: 10px;
  }
  .select-container {
    display: flex;
    flex-direction: row;
  }
  .popupButton {
    font-size: 14px;
    cursor: pointer;
    border: 1px solid blue;
    max-width: 80%;
    min-width: 20%;
    width: 160px;
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

function PopupForm({ children, onSubmit }) {
  return <PopupFormStyle onSubmit={onSubmit}>{children}</PopupFormStyle>;
}

export default PopupForm;
