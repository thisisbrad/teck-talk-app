import app from "./app/index.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on ${PORT} `);
});
