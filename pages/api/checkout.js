import dbPool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { userid, total, cartProducts } = req.body;

  const promisePool = dbPool.promise();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const [productsInfos] = await promisePool.query(
    "Select * from `Products` WHERE ProductID in (" + [uniqueIds] + ")"
  );
  var date = new Date();
  date = date.toISOString();
  const status = "Pending";

  try {
    const orderInsertResult = await promisePool
      .query(
        "INSERT INTO `Orders` (UserID, OrderDate, TotalAmount, OrderStatus) VALUES (?,?,?,?)",
        [userid, date, total, status]
      )
      .catch((err) => {
        console.log(err);
      });

    const orderID = orderInsertResult[0].insertId;

    for (const productId of uniqueIds) {
      const p_ID = Number(productId);
      const productInfo = productsInfos.find(
        (p) => p.ProductID === productId
      );
      console.log(productInfo);
      const quantity =
        Number(productsIds.filter((id) => id === productId)?.length) || 0;
      const price = Number(quantity * productInfo.Price);
      if (quantity > 0 && productInfo) {
        const [] = await promisePool.query(
          "INSERT INTO `OrderDetails` (OrderID, ProductID, Quantity, PriceAtOrderTime) Values (?,?,?,?)",
          [orderID, p_ID, quantity, price]
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  res.json(true);
}
