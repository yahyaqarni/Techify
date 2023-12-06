import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import dbPool from "@/lib/db";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = 1025;
  const poolPromise = dbPool.promise();
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
  console.log(newProducts);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(rows[0])),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
