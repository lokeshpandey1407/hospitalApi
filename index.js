import express from "express";
import cors from "cors";

import ConnectMongoose from "./src/config/mongodb.config.js";
import DoctorRoutes from "./src/features/Doctor/doctor.routes.js";
import { errorHandler } from "./src/middlewares/ErrorHandler.middleware.js";
import PatientRoutes from "./src/features/Patient/patient.routes.js";
import ReportRoutes from "./src/features/Report/report.routes.js";
import Auth from "./src/middlewares/Auth.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

//json body parser configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie config
app.use(cookieParser());

//Cors configuration
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to the application");
});

//Doctors Routes
app.use("/api/doctors", DoctorRoutes);

//Patients Routes
app.use("/api/patients", Auth, PatientRoutes);

//Report Routes
app.use("/api/reports", Auth, ReportRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Invalid route, Please check the route and try again",
  });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Application is listenting at ${process.env.PORT}`);
  ConnectMongoose();
});
