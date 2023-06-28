import fs from "fs";
import { Express } from "express";

export const setupRoutes = (app: Express, baseRoute: string) => {
  app.get(baseRoute, (_, res) => {
    res.status(200).json({ status: "active" });
  });

  const fileRoutes = fs.readdirSync(__dirname);
  for (let fileRoute of fileRoutes) {
    if (fileRoute === "index.ts") continue;

    const router = require(__dirname + "/" + fileRoute).default.router;

    let routeSegment = fileRoute.split(".")[0];

    app.use(baseRoute + routeSegment, router);
  }
};
