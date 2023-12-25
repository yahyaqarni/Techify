import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import dbPool from "@/lib/db";
import Session from "@/components/Session";
import Footer from "@/components/Footer";
import { getSession } from "next-auth/react";

export default function HomePage({ featuredProduct, newProducts, favids }) {
  console.log(favids)
  return (
    <Session>
      <div>
        <Header />
        <Featured product={featuredProduct} />
        <NewProducts products={newProducts} favids={favids} />
        <Footer />
      </div>
    </Session>
  );
}

export async function getServerSideProps(context) {
  const featuredProductId = 1025;
  const poolPromise = dbPool.promise();
  const session = await getSession(context);
  const [rows] = await poolPromise
    .query("Select * from `Products` Where ProductID = ?", [featuredProductId])
    .catch((err) => {
      console.log(err);
    });
  const [newProducts] = await poolPromise
    .query(
      "SELECT Products.*, Images.ImgURL FROM Products LEFT JOIN (SELECT ProductID, ImgURL FROM Images GROUP BY ProductID) AS Images ON Products.ProductID = Images.ProductID ORDER BY Products.ProductID DESC LIMIT 8;"
    )
    .catch((err) => {
      console.log(err);
    });
    let productids = [];
    if (session?.user?.id) {
      [productids] = await poolPromise.query("CALL GetWishlistProducts(?)", [
        session.user.id,
      ]).catch(err=>{console.log(err)});
    }
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(rows[0])),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      favids: JSON.parse(JSON.stringify(productids[0]))
    },
  };
}
