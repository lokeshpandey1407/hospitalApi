import jwt from "jsonwebtoken";

//Auth middleware to check if the user authenticated
const Auth = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(400).json({
        success: false,
        message: "unauthorized Access! login to continue!",
      });
    } else {
      const payload = jwt.verify(authToken, process.env.SECRET_KEY);
      req.doctorId = payload.doctorId;
      req.doctorName = payload.doctorName;
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "unauthorized Access! login to continue!",
    });
  }
  next();
};

export default Auth;
