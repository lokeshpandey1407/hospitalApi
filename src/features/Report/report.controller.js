import ReportRepository from "./report.repository.js";

export default class ReportController {
  constructor() {
    this.reportRepository = new ReportRepository();
  }
  //Function to get all Reports by status
  async getAllByStatus(req, res, next) {
    const { status } = req.params;
    try {
      const reports = await this.reportRepository.getAllByStatus(status);
      res.status(200).json({ success: true, message: "", data: reports });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
