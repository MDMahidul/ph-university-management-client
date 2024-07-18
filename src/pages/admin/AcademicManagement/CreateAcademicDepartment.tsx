import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

// get the current year
const currentYear = new Date().getFullYear();

// now create next 5 year by adding number with the current year
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicDepartment = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // get semester name
    const name = nameOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect label="Name" name="name" options={nameOptions}/>
            <PHSelect label="Year" name="year" options={yearOptions}/>
            <PHSelect label="Start Month" name="startMonth" options={monthOptions}/>
            <PHSelect label="End Month" name="endMonth" options={monthOptions}/>
         <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
