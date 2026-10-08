import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/service.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/services", serviceRoutes);

export default app;
