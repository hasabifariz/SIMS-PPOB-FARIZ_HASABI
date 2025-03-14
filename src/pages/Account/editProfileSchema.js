import * as yup from "yup";

export const editProfileSchema = yup.object({
  first_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Nama depan hanya boleh berisi huruf")
    .required("Nama depan wajib diisi"),
  last_name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Nama belakang hanya boleh berisi huruf")
    .required("Nama belakang wajib diisi"),
});