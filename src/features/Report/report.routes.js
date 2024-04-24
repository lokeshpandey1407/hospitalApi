import express from "express";
import ReportController from "./report.controller.js";

const ReportRoutes = express.Router();
const reportController = new ReportController();

//To get all the reports by status
ReportRoutes.get("/:status", (req, res, next) => {
  reportController.getAllByStatus(req, res, next);
});

export default ReportRoutes;
