import Header from "@/components/Header";
import dbPool from "@/lib/db";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const poolPromise = dbPool.promise();

  const [products] = await poolPromise
    .query(
      "SELECT Products.*, Images.ImgURL FROM Products LEFT JOIN (SELECT ProductID, ImgURL FROM Images GROUP BY ProductID) AS Images ON Products.ProductID = Images.ProductID ORDER BY Products.ProductID DESC LIMIT 8;"
    )
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
