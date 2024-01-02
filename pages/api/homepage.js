import dbPool from "@/lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });


      const poolPromise = dbPool.promise();

      const [productIdsData] = await poolPromise.query(
        "CALL GetWishlistProducts(?)",
        [session.user.id]
      );

      res.json(productIdsData[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
