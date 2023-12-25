import dbPool from "@/lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const productID = Number(req.query.id);
    const poolPromise = dbPool.promise();
    const session = await getSession({ req });
    if (session) {
      const userId = session?.user?.id; // Assuming your user object has an 'id' field

      const [] = await poolPromise
        .query("CALL AddToWishlist(?,?)", [userId, productID])
        .catch((err) => {
          console.log(err);
          res.json(false);
        }); 
      res.json(true);
    } else {
      // Handle case when there's no session (user not authenticated)
      res.status(401).json({ error: "Unauthorized" });
    }
  }

  if (req.method === "DELETE") {
    const productID = Number(req.query.id);
    const poolPromise = dbPool.promise();
    const session = await getSession({ req });
    if (session) {
      const userId = session?.user?.id; // Assuming your user object has an 'id' field

      const [] = await poolPromise
        .query("CALL RemoveFromWishlist(?,?)", [userId, productID])
        .catch((err) => {
          console.log(err);
          res.json(false);
        });
      res.json(true);
    } else {
      // Handle case when there's no session (user not authenticated)
      res.status(401).json({ error: "Unauthorized" });
    }
  }

  if (req.method === "GET") {
    const poolPromise = dbPool.promise();
    const session = await getSession({ req });

    let productids = [];
    if (session?.user?.id) {
      [productids] = await poolPromise
        .query("CALL GetWishlistProducts(?)", [session.user.id])
        .catch((err) => {
          console.log(err);
          res.json(false);
        });
    }
    if(productids[0] && productids[0].length > 0)
        res.json(productids[0]);
    else
        res.json([])
  }
}
