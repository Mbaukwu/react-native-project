import * as yup from "yup";

export const signInFormValidator = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Name can only contain letters")
        .required("Name is required"),
    
  email: yup
    .string()
    .email()
    .matches(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_'+-]@[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)*\.[a-z]{2,}$/i,
      "Invalid email address"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^(?=.*?[a-z])/, "Password must be at least one lowercase letter")
    .matches(/^(?=.*?[A-Z])/, "Password must be at least one uppercase letter")
    .matches(/^(?=.*?\d)/, "Password must be at least one digit")
    .matches(
      /^(?=.*?[#?!@$%^&*-])/,
      "Password must be at least one special character"
    )
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});
