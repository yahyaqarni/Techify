import Center from "./Center";
import styled from "styled-components";

const StyledFooter = styled.header`
  background-color: #222;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 05px 0;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Center>
        <Wrapper>
          <Desc>YAHYA JUNAID | Copyright 2023</Desc>
        </Wrapper>
      </Center>
    </StyledFooter>
  );
}
