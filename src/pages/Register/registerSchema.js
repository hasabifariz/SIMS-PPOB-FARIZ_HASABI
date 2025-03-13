import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email("Format email tidak valid").required("Email wajib diisi"),
  first_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Nama depan hanya boleh berisi huruf")
    .required("Nama depan wajib diisi"),
  last_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Nama belakang hanya boleh berisi huruf")
    .required("Nama belakang wajib diisi"),
  password: yup.string().min(8, "Password minimal 8 karakter").required("Password wajib diisi"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Konfirmasi password harus sama dengan password")
    .required("Konfirmasi password wajib diisi"),
});