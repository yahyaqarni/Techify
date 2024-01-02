import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import dbPool from "@/lib/db";
import { getSession } from "next-auth/react";


export default function HomePage({ featuredProduct, newProducts, favids }) {

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} favids={favids} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const featuredProductId = 1025;
  const poolPromise = dbPool.promise();
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const [rows] = await poolPromise
    .query("Select * from Products Where ProductID = ?", [featuredProductId])
    .catch((err) => {
      console.log(err);
    });
  const [newProducts] = await poolPromise
    .query(
      "SELECT * FROM ProductsWithImages ORDER BY ProductID DESC LIMIT 8;"
    )
    .catch((err) => {
      console.log(err);
    });
  let productids = [];
  if (session?.user?.id) {
    [productids] = await poolPromise
      .query("CALL GetWishlistProducts(?)", [session.user.id])
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(session);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(rows[0])),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      favids:
        productids.length > 0 ? JSON.parse(JSON.stringify(productids[0])) : [],
    },
  };
}
