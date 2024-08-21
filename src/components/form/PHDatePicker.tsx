import { DatePicker, Form } from "antd";
import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              size="large"
              id={name}
              style={{ width: "100%" }}
              onChange={(date) => field.onChange(date ? date.toDate() : null)}
              value={field.value ? moment(field.value) : null}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
