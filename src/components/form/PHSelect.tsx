import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  mode?: "multiple" | undefined;
};

const PHSelect = ({
  label,
  name,
  options,
  placeholder,
  disabled,
  onChange,
  mode,
}: TPHSelectProps) => {
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
            onChange={(value) => {
              field.onChange(value); // Update form value
              if (onChange) onChange(value); // Call custom onChange handler if provided
            }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    ></Controller>
  );
};

export default PHSelect;
