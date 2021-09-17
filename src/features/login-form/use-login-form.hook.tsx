import { useFormik } from "formik";
import { useRef } from "react";
import { Alert, TextInput } from "react-native";
import * as yup from "yup";
import { useStore } from "~/mobx/utils/useStore";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email format invalid")
    .max(50, "Email is too long")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password too short"),
});

export function useLoginForm() {
  const store = useStore();

  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    isValid,
    submitForm,
    touched,
    values,
  } = useFormik({
    initialValues: {
      email: __DEV__ ? `dominik@lloyds.design` : "",
      password: __DEV__ ? "test1234" : "",
    },
    validationSchema,
    async onSubmit(values, actions) {
      try {
        await store.authStore.login(values);
      } catch (error) {
        console.warn("error logging in", error?.response?.status);

        const statusCode = error.response?.status;

        if (statusCode === 401) {
          actions.setErrors({
            email: "",
            password: "Wrong email or password",
          });
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      }
    },
  });

  const refs = {
    passwordInput: useRef<TextInput>(null),
  };

  const fields = {
    email: {
      value: values.email,
      onChangeText: handleChange("email") as (text: string) => void,
      onBlur: handleBlur("email") as () => void,
      caption: (touched.email && errors.email) || " ",
      error: Boolean(touched.email && errors.email), // our text input
      onSubmitEditing: () => refs.passwordInput?.current?.focus(),
    },
    password: {
      ref: refs.passwordInput,
      value: values.password,
      onChangeText: handleChange("password") as (text: string) => void,
      onBlur: handleBlur("password") as () => void,
      caption: (touched.password && errors.password) || " ",
      // status: touched.password && errors.password ? "danger" : "basic", // ui kitten style
      error: Boolean(touched.password && errors.password), // our text input
      onSubmitEditing: () => submitForm(),
    },
  };

  return {
    fields,
    isSubmitting,
    isValid,
    submitForm,
  };
}
