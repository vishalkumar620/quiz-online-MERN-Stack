const express = require("express");
const app = express();
require("dotenv").config();
const connectedToMongo = require("./confing/dbConfig")
app.use(express.json());


connectedToMongo();
const userRoute = require("./routes/UserRoute");
const examsRoute = require("./routes/examsRoute");
const resportsRoute=require("./routes/reportsRoute")

app.use("/api/users", userRoute);

app.use("/api/exams", examsRoute);
app.use("/api/reports",resportsRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});


