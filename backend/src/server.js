const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
========================================
🚀 Hospital Management API Started
========================================
Environment : ${process.env.NODE_ENV || "development"}
Port        : ${PORT}
========================================
`);
});