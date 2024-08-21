import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectWithWatchProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  placeholder?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  mode?: "multiple" | undefined;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  placeholder,
  disabled,
  onChange,
  mode,
}: TPHSelectWithWatchProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({ control, name });

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            size="large"
            style={{ width: "100%" }}
            {...field}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    ></Controller>
  );
};

export default PHSelectWithWatch;
