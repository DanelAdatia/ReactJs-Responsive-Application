import { useFormik } from "formik";

export const useForm = (initialValues, onSubmit) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });
  return formik;
};
