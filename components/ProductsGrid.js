import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products, favids }) {
  let productsWithLikeStatus = [];

  if (products.length > 0) {
    if (favids && favids.length > 0) {
      productsWithLikeStatus = products.map(product => ({
        ...product,
        isLiked: favids.some(favProduct => favProduct.ProductID === product.ProductID),
      }));
    } else {
      // If favids is empty, set isLiked to false for all products
      productsWithLikeStatus = products.map(product => ({
        ...product,
        isLiked: false,
      }));
    }

    return (
      <StyledProductsGrid>
        {productsWithLikeStatus.map(product => (
          <ProductBox key={product.ProductID} {...product} />
        ))}
      </StyledProductsGrid>
    );
  } else {
    return <div>No products available.</div>;
  }
}
