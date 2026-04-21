import * as yup from 'yup';


// ──All Auth Validation Schema ────────────────────────────────────────
 
// ── Sign Out─────────────────

const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i;

export const signUpSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
   email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email')
    .matches(validEmailRegex, 'Please enter a valid email address (e.g., name@domain.com)'),
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
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
export type SignUpFormData = yup.InferType<typeof signUpSchema>;

 // ── Sign In ────────────────────────────────────────
export const signInSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required'),
});

export type SignInFormData = yup.InferType<typeof signInSchema>; 
 
 // ── Reset Password ────────────────────────────────────────
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

 // ── Forgot Password ────────────────────────────────────────
export const forgotPasswordSchema = yup.object({
   email: yup
     .string()
     .required('Email is required')
     .email('Please enter a valid email'),
 });
 
 export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;