import express from "express";

import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead
} from "../controllers/lead.controller";

import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// ALL ROUTES PROTECTED
router.use(protect);

// CRUD
router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;