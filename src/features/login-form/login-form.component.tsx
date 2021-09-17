import React from "react";
import { observer } from "mobx-react";

import { View } from "~/components/View";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { Modal } from "~/components/ModalProvider";
import { TextInput } from "~/components/TextInput";
import { Text } from "~/components/Text";

import { useLoginForm } from "./use-login-form.hook";

export const LoginForm = observer(function LoginForm() {
  const { fields, isSubmitting, isValid, submitForm } = useLoginForm();

  return (
    <View flex paddingExtraLarge>
      <Text weightBold>Login</Text>
      <Spacer />

      <TextInput
        label="Email"
        placeholder="john.doe@email.com"
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        spellCheck={false}
        blurOnSubmit={false}
        maxLength={50}
        value={fields.email.value}
        onChangeText={fields.email.onChangeText}
        onBlur={fields.email.onBlur}
        caption={fields.email.caption}
        error={fields.email.error}
        onSubmitEditing={fields.email.onSubmitEditing}
      />
      <Spacer small />

      <TextInput
        label="Password"
        placeholder="********"
        secureTextEntry
        returnKeyType="go"
        autoCapitalize="none"
        spellCheck={false}
        textContentType="password"
        ref={fields.password.ref}
        value={fields.password.value}
        onChangeText={fields.password.onChangeText}
        onBlur={fields.password.onBlur}
        caption={fields.password.caption}
        error={fields.password.error}
        onSubmitEditing={fields.password.onSubmitEditing}
      />
      <Spacer extraLarge />

      <Button onPress={submitForm} disabled={!isValid} title="Sign in" />
      {isSubmitting && <Modal />}

      <Spacer large />

      <Button
        onPress={() => {
          console.warn("TODO");
        }}
        title="Forgot password?"
      />

      <Spacer />

      <Button
        onPress={() => {
          console.warn("TODO");
        }}
        title="Register"
      />
    </View>
  );
});
