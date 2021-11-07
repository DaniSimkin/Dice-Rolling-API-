import { Request, Response } from "express";

exports.userCreationValidator = (req: Request, res: Response, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("password", "Password is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 9,
    })
    .withMessage("Password must be between 3 to 9 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least 1 number");

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
