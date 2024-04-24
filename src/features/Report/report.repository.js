import ReportModel from "./report.schema.js";

export default class ReportRepository {
  //For creating a report
  async create(data) {
    const report = await new ReportModel(data).save();
    return report;
  }

  //For getting all reports by patient id
  async getAllByPatientId(patient) {
    const reports = await ReportModel.find({ patient })
      .populate("patient")
      .populate({
        path: "doctor",
        select: ["name", "specialization", "phone", "email"],
      });
    return reports;
  }

  //For getting all reports by report status
  async getAllByStatus(status) {
    const reports = await ReportModel.find({ status })
      .populate("patient")
      .populate({
        path: "doctor",
        select: ["name", "specialization", "phone", "email"],
      });
    return reports;
  }
}
