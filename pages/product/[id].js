import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import dbPool from "@/lib/db";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.Title}</Title>
            <p>{product.Description}</p>
            <PriceRow>
              <div>
                <Price>${product.Price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product.ProductID)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const promiseDb = dbPool.promise();
  const {id} = context.query;
  const [rows] = await promiseDb
        .query(
          "Select `Products`.*, `Images`.`ImgURL` from `Products` LEFT JOIN `Images` ON `Products`.`ProductID` = `Images`.`ProductID` Where `Products`.`ProductID` = " +
            Number(id)
        )
        .catch((err) => {
          console.log(err);
        });
      let images = [];
      rows.forEach((row) => {
        console.log(row.ImgURL);
        if (row.ImgURL != null) images.push(row.ImgURL);
      });
      const queryResult = {
        ProductID: rows[0].ProductID,
        CategoryID: rows[0].CategoryID,
        Title: rows[0].Title,
        Description: rows[0].Description,
        Price: rows[0].Price,
        Quantity: rows[0].Quantity,
        images,
      };

  return {
    props: {
      product: JSON.parse(JSON.stringify(queryResult)),
    }
  }
}