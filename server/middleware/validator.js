import { check, validationResult } from "express-validator";

export const signUpValidator = [
  check([ "firstName", "lastName", "email", "password", "confirmPassword"]).not().isEmpty().trim().withMessage("All fields required."),
  check("email").isEmail().normalizeEmail().withMessage("Invalid email."),
  check("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be 6 - 16 characters long."),
];

export const signInValidator = [
  check("email").isEmail().normalizeEmail().withMessage("Invalid email."),
  check("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be 6 - 16 characters long."),
]

export const validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      message: firstError,
    });
  }
  next();
};
