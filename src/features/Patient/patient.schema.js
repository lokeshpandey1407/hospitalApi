import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, reqired: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

PatientSchema.pre("save", function () {
  this.reports = [];
});

const PatientModel = mongoose.model("Patient", PatientSchema);
export default PatientModel;
