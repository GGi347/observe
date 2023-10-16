import styled from "styled-components";

const FooterStyled = styled.footer`
  background-color: var(--color-grey-200);
  margin: 0;
  display: flex;
  align-items: end;
  justify-content: end;
  padding: 20px;
`;

function Footer() {
  return <FooterStyled>&copy; Gyanashree Giri</FooterStyled>;
}

export default Footer;
