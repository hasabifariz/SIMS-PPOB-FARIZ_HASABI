import * as Yup from 'yup';

export const topupSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError('Nominal harus angka')
    .min(10000, 'Minimum nominal adalah Rp10,000')
    .max(1000000, 'Maximum nominal adalah Rp1,000,000')
    .required('Nominal wajib diisi'),
});