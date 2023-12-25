import dbPool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const searchParams = req.query.params;
    const poolPromise = dbPool.promise();
    const searchValue = `%${searchParams}%`;
    if (searchParams !== "") {
      const [rows, feilds] = await poolPromise
        .query("Select ProductID, Title from `Products` where Title LIKE ?", [
          searchValue,
        ])
        .catch((err) => {
          console.log(err);
        });
      if (rows && rows.length > 0) res.json(rows);
    } else res.json([]);
  }
}
