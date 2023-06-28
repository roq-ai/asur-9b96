import * as yup from 'yup';

export const participationValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  session_id: yup.string().nullable(),
});
