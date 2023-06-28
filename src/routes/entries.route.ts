import { Router } from "express";
import EntryService from "../services/entry.service";

const entryRouter = Router();

entryRouter.get("/", EntryService.listEntries);

export default { router: entryRouter };
