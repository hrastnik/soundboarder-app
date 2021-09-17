import React, { ReactNode } from "react";

export interface RadioGroupContextType<T = any> {
  onChange: (value: T) => any;
  selectedValue: T;
}

export const RadioGroupContext = React.createContext<RadioGroupContextType>({
  onChange() {},
  selectedValue: undefined,
});

interface RadioGroupProps<T> {
  onChange: (value: T) => any;
  selectedValue: T;
  children?: ReactNode;
}

function RadioGroup<T>({
  onChange,
  selectedValue,
  ...otherProps
}: RadioGroupProps<T>) {
  return (
    <RadioGroupContext.Provider
      value={{ onChange, selectedValue }}
      {...otherProps}
    />
  );
}

export { RadioGroup };
