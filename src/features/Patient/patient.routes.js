import express from "express";
import PatientController from "./patient.controller.js";

const PatientRoutes = express.Router();
const patientController = new PatientController();

//Register a patient
PatientRoutes.post("/register", (req, res, next) => {
  patientController.create(req, res, next);
});

//Creating a report
PatientRoutes.post("/:id/create_report", (req, res, next) => {
  patientController.createReport(req, res, next);
});

//Getting all reports by patient Id
PatientRoutes.get("/:id/all_reports", (req, res, next) => {
  patientController.getAllByPatientId(req, res, next);
});

export default PatientRoutes;
