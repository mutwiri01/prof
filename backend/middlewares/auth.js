import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard admin users
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
      return next(new ErrorHandler("Dashboard User is not authenticated!", 401));
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Retrieve user from the database
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return next(new ErrorHandler("User not found!", 404));
      }
      // Check if user is an Admin
      if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
      }
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return next(new ErrorHandler("Invalid or expired token!", 401));
    }
  }
);

// Middleware to authenticate frontend users (Patients)
export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 401));
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Retrieve user from the database
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return next(new ErrorHandler("User not found!", 404));
      }
      // Check if user is a Patient
      if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
      }
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return next(new ErrorHandler("Invalid or expired token!", 401));
    }
  }
);

// Middleware to authorize users based on roles
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403));
    }
    next();
  };
};
