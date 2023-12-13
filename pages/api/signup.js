import dbPool from "@/lib/db";
import bcrypt from "bcrypt";

var userData = {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        fName,
        lName,
        Email,
        Password,
        rePass,
        street,
        city,
        province,
        country,
        zipcode,
        phone,
      } = req.body;

      const pass = Password;
      const saltRounds = 10;
      const hash = bcrypt.hashSync(pass, saltRounds);

      const userRole = "Customer";

      const userInsertResult = await dbPool.promise().query(
        "INSERT INTO Users (`fName`, `lName`, `Email`, `Password`, `userRole`) Values (?,?,?,?,?) ",
        [fName, lName, Email, hash, userRole]
      );

      const UserID = userInsertResult[0].insertId;

      await dbPool.promise().query(
        "INSERT INTO `Addresses` (UserID, street, city, province, country, zipcode, phone) Values (?,?,?,?,?,?,?)",
        [UserID, street, city, province, country, zipcode, phone]
      );

      res.json(true);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.json({ error: 1062 });
      } else {
        // If other errors occur
        res.status(400).json("Sorry!! Unable To Add");
        console.log("Error inserting: %s ", err);
      }
    }
  }
}

// connection.query("SELECT * FROM signup", function (error, results, fields) {
//   if (error) {
//     console.error("error connecting: " + error.stack);
//     return;
//   }
//   // connected!
//   console.log(results);
//   //connection.end();
//   //console.log(fields);
// });
