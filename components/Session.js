import { useSession, signIn, signOut } from "next-auth/react";
import Button from "./Button";
import Center from "./Center";
import Header from "./Header";
import Title from "./Title";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function Session({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <>
        <StyledDiv>
          <Title>Welcome to Techify!</Title>
          <Button
            onClick={() =>
              signIn({
                callbackUrl: "http://localhost:3001",
                redirect_uri: "http://localhost:3001",
              })
            }
          >
            Login
          </Button>

          <Button onClick= {()=> router.push("/register")}>Sign Up</Button>
        </StyledDiv>
      </>
    );
  } else return <>{children}</>;
}
