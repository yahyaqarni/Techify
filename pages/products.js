import Header from "@/components/Header";
import dbPool from "@/lib/db";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import { getSession } from "next-auth/react";

export default function ProductsPage({ products, favids}) {
  console.log(favids)
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} favids={favids} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const poolPromise = dbPool.promise();
    const session = await getSession(context);

    const [products] = await poolPromise.query(
      "SELECT Products.*, Images.ImgURL FROM Products LEFT JOIN (SELECT ProductID, ImgURL FROM Images GROUP BY ProductID) AS Images ON Products.ProductID = Images.ProductID;"
    );

    let productids = [];
    if (session?.user?.id) {
      [productids] = await poolPromise.query("CALL GetWishlistProducts(?)", [
        session.user.id,
      ]);
    }

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        favids: JSON.parse(JSON.stringify(productids[0])),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
  }
}
