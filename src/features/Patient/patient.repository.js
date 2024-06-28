import ReportRepository from "../Report/report.repository.js";
import PatientModel from "./patient.schema.js";

export default class PatientRepository {
  constructor() {
    this.reportRepository = new ReportRepository();
  }
  //For creating patient
  async createPatient(data) {
    return await new PatientModel(data).save();
  }

  //For finding one by phone number
  async findOne(phone) {
    return await PatientModel.findOne({ phone });
  }

  //For creating report by patient id
  async createReport(id, data) {
    const report = await this.reportRepository.create(data);
    await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { reports: report._id },
      },
      { new: true }
    ).populate("reports");
    return report;
  }

  //For getting all reports by patient id
  async getAllByPatientId(id) {
    const reports = this.reportRepository.getAllByPatientId(id);
    return reports;
  }
}
