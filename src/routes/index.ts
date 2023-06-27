import { Express } from "express";

export const setupRoutes = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
};
