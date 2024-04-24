import DoctorRepository from "./doctor.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class DoctorController {
  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  //signup function for doctor registration
  async signup(req, res, next) {
    try {
      const doctor = await this.doctorRepository.signup(req.body);
      if (!doctor) {
        return res.status(500).json({
          success: false,
          message: "Registration unsuccessful, Please try again later",
        });
      }
      res
        .status(201)
        .json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //signin function
  async signin(req, res, next) {
    const { email, password } = req.body;
    try {
      const doctor = await this.doctorRepository.findByEmail(email);
      if (!doctor) {
        return res.status(500).json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        const isValid = bcrypt.compare(password, doctor.password);
        if (!isValid) {
          return res.status(500).json({
            success: false,
            message: "Invalid credentials",
          });
        } else {
          const token = jwt.sign(
            {
              doctorId: doctor._id,
              doctorName: doctor.name,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.cookie("authToken", token, {
            path: "/",
            maxAge: 1 * 24 * 60 * 60 * 1000,
          });
          res.status(201).json({
            success: true,
            message: "Successfully logged in.",
            data: token,
          });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
