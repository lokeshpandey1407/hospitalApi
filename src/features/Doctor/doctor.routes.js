import express from "express";
import DoctorController from "./doctor.controller.js";

const DoctorRoutes = express.Router();
const doctorController = new DoctorController();

//Register Route
DoctorRoutes.post("/register", (req, res, next) => {
  doctorController.signup(req, res, next);
});

//Sign in route
DoctorRoutes.post("/signin", (req, res, next) => {
  doctorController.signin(req, res, next);
});

export default DoctorRoutes;
