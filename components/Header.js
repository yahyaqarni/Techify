import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import { signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  flex: 0.3;
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex: .5;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  align-self:center;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  align-items:center;
  align-self:center;
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    flex: 2.2;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: flex;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SearchWrap = styled.div`
  width: 30%;
  margin: auto;
  margin-left: 05%;
  display: flex;
  flex: .85;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  z-index: 20;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [results, setResults] = useState([]);
  const { data: session } = useSession();

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Techify</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
            <NavLink href={"/wishlist"}>Favourites</NavLink>
            <NavLink href={"/account"}>{session?.user?.name}</NavLink>
            <SearchWrap>
              <SearchBar setResults={setResults} />
              {results && results.length > 0 && (
                <SearchResultsList results={results} />
              )}
            </SearchWrap>
          </StyledNav>
          <ButtonWrapper>
            <Button onClick={signOut} block>
              Log Out
            </Button>
          </ButtonWrapper>

          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
