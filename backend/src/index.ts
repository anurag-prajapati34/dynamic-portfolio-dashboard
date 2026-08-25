import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

import routes from "./routes/index.js";
const app = express();

const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dynamic-portfolio-dashboard-three.vercel.app",
    ],
  }),
);
app.use(express.json());

//healt

app.get("/health", (req, res) => {
  res.send("ok");
});

//register routes
app.use("/api", routes);

//listen to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
