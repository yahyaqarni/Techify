import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { primary } from "@/lib/colors";
import axios from "axios";


const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 180px;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const ProductTitle = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Pricetag = styled.div`
  display: flex;
  flex: 1;
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const HeartIcon = styled.svg`
  display: flex;
  fill: ${({ isLiked }) => (isLiked ? 'red' : 'transparent')};
  stroke: ${({ isLiked }) => (isLiked ? 'transparent' : 'red')};
  stroke-width: 2;
  width: 28px;
  height: 28px;
  padding: 5px;
  cursor: pointer;
  transition: fill 0.3s, width 0.1s, height 0.1s;
  &:hover{
    fill: red;
  }
`;

export default function ProductBox({
  ProductID,
  Title,
  description,
  Price,
  ImgURL,
  isLiked: initialIsLiked
}) {
  const { addProduct } = useContext(CartContext);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const url = "/product/" + ProductID;

  
  const handleToggle = async () => {
    // Make your API call to add/remove from wishlist here
    // Simulating the toggling behavior for the heart icon
    if(!isLiked){
      await axios.post(`/api/wishlist?id=${ProductID}`)
    }
    else if(isLiked){
      await axios.delete(`/api/wishlist?id=${ProductID}`)
    }
    setIsLiked(!isLiked);
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={ImgURL} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <ProductTitle href={url}>{Title}</ProductTitle>
        <PriceRow>
          <Pricetag>${Price}</Pricetag>
          <HeartIcon isLiked={isLiked} onClick={handleToggle}>
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </HeartIcon>
          <Button block onClick={() => addProduct(ProductID)} primary outline>
            +
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

