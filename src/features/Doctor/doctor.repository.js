import DoctorModel from "./doctor.schema.js";

export default class DoctorRepository {
  async signup(data) {
    return await new DoctorModel(data).save();
  }

  async findByEmail(email) {
    return await DoctorModel.findOne({ email });
  }
}
