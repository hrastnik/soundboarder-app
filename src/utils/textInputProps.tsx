import { TextInputProps } from "react-native";

const email: TextInputProps = {
  placeholder: "Email",
  keyboardType: "email-address",
  textContentType: "emailAddress",
  autoCapitalize: "none",
  maxLength: 50,
  spellCheck: false,
};

const password: TextInputProps = {
  placeholder: "Password",
  autoCapitalize: "none",
  secureTextEntry: true,
  spellCheck: false,
  textContentType: "password",
};

const phoneNumber: TextInputProps = {
  placeholder: "Phone",
  keyboardType: "phone-pad",
  textContentType: "telephoneNumber",
  maxLength: 16,
  spellCheck: false,
};

const name: TextInputProps = {
  placeholder: "First and Last Name",
  keyboardType: "default",
  textContentType: "givenName",
  autoCapitalize: "words",
  maxLength: 50,
  spellCheck: false,
};

export const textInputProps = {
  email,
  password,
  phoneNumber,
  name,
};
