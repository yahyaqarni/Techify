import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 180px;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const ProductTitle = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Pricetag = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({ProductID,Title,description,Price,ImgURL}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+ProductID;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={ImgURL} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <ProductTitle href={url}>
          {Title}
        </ProductTitle>
        <PriceRow>
          <Pricetag>
            ${Price}
          </Pricetag>
          <Button block onClick={() => addProduct(ProductID)} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}