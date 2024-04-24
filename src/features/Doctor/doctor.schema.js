import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, reqruied: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    specialization: { type: String, required: true },
    licenceNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

DoctorSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const DoctorModel = mongoose.model("Doctor", DoctorSchema);
export default DoctorModel;
