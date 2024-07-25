const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const PORT = process.env.PORT || 8001;
const app = express();
const schema = require("./schema/schema");
const connectDB = require("./config/db");
console.log("port : ", process.env.PORT);
const cors = require("cors");

//connection to database
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, console.log(`server is running on http://localhost:${PORT}`));
