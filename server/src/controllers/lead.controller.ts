import { Request, Response } from "express";
import Lead from "../models/Lead";

/**
 * CREATE LEAD
 */
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * GET LEADS (FILTER + SEARCH + PAGINATION)
 */
export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const { status, source, search, sort } = req.query;

    const query: any = {};

    // filters
    if (status) query.status = status;
    if (source) query.source = source;

    // search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // sorting
    const sortOrder = sort === "oldest" ? 1 : -1;

    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(query);

    res.json({
      data: leads,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * GET SINGLE LEAD
 */
export const getLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.json(lead);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * UPDATE LEAD
 */
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.json(lead);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * DELETE LEAD
 */
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.json({
      message: "Lead deleted"
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};