import dbPool from "@/lib/db";

export default async function handle(req, res) {
  const poolPromise = dbPool.promise();
  const ids = req.body.ids;
  console.log(ids)
  const idList = ids.map((id) => `${id}`).join(", ");
  console.log(idList)
  const [products] = await poolPromise
    .query("SELECT Products.*, Images.ImgURL FROM Products LEFT JOIN (SELECT ProductID, ImgURL FROM Images GROUP BY ProductID) AS Images ON Products.ProductID = Images.ProductID Where Products.ProductID in ("+[idList]+")")
    .catch((err) => {
      res.status(500).json(err);
    });
    console.log(products)
  res.json(products);
}
