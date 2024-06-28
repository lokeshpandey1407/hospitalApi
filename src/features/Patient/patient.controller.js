import ReportRepository from "../Report/report.repository.js";
import PatientRepository from "./patient.repository.js";

export default class PatientController {
  constructor() {
    this.patientRepository = new PatientRepository();
    this.reportRepository = new ReportRepository();
  }

  //Function to create Patient
  async create(req, res, next) {
    const { phone } = req.body;
    try {
      let patientFound = await this.patientRepository.findOne(phone);
      if (patientFound) {
        return res.status(200).json({
          success: true,
          message: "Patient was already registerd",
          data: patientFound,
        });
      } else {
        const patient = await this.patientRepository.createPatient(req.body);
        return res.status(201).json({
          success: true,
          message: "Patient successfully registered",
          data: patient,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //Function to create Report of a patient
  async createReport(req, res, next) {
    const { id } = req.params;
    const { doctor, status, date } = req.body;
    try {
      const report = await this.patientRepository.createReport(id, {
        doctor,
        status,
        date,
        patient: id,
      });
      if (!report) {
        return res.status(404).json({
          success: false,
          message: "Can't find patient with given Id.",
        });
      }
      res.status(201).json({
        success: true,
        message: "Report created successfully",
        data: report,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //Function to get all reports by patient Id
  async getAllByPatientId(req, res, next) {
    const { id } = req.params;
    try {
      const reports = await this.patientRepository.getAllByPatientId(id);
      res.status(200).json({ success: true, message: "", data: reports });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
