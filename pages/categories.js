import Header from "@/components/Header";
import dbPool from "@/lib/db";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import { getSession } from "next-auth/react";

export default function CategoriesPage({  laptops, phones, watches, favids }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Laptops</Title>
        <ProductsGrid products={laptops} favids={favids} />

        <Title>Smart Phones</Title>
        <ProductsGrid products={phones} favids={favids} />


        <Title>Smart Watches</Title>
        <ProductsGrid products={watches} favids={favids} />

      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const poolPromise = dbPool.promise();
  const session = await getSession(context);
  const [laptops] = await poolPromise
    .query(
        "SELECT * FROM ProductsWithImages WHERE CategoryID=4;")
        .catch((err) => {
      console.log(err);
    });

    const [phones] = await poolPromise
    .query(
        "SELECT * FROM ProductsWithImages WHERE CategoryID=2;")
    .catch((err) => {
      console.log(err);
    });

    const [watches] = await poolPromise
    .query(
        "SELECT * FROM ProductsWithImages WHERE CategoryID=5;")
    .catch((err) => {
      console.log(err);
    });

    let productids = [];
    if (session?.user?.id) {
      [productids] = await poolPromise.query("CALL GetWcishlistProducts(?)", [
        session.user.id,
      ]).catch(err=>{console.log(err)});
    }

  return {
    props: {
      laptops: JSON.parse(JSON.stringify(laptops)),
      phones: JSON.parse(JSON.stringify(phones)),
      watches: JSON.parse(JSON.stringify(watches)),
      favids: JSON.parse(JSON.stringify(productids[0]))
    },
  };
}
