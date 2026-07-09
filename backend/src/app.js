const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const apiRoutes = require("./routes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined"));

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/v1", apiRoutes);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;