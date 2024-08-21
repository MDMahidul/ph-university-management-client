import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { useNavigate } from "react-router-dom";
import PHDatePicker from "../../../components/form/PHDatePicker";

const SemesterRegistration = () => {
  const navigate = useNavigate();
  const [addRegisterSemester] = useAddRegisterSemesterMutation();
  const { data: academicSemester } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...", {
      style: { padding: "10px" },
    });
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addRegisterSemester(semesterData)) as TResponse<any>;
      console.log(res);

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Semester added successfully!", {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        navigate("/admin/registered-semesters");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, { duration: 2000, id: toastId });
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Semester Registration
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              label={"Academic Semester"}
              name={"academicSemester"}
              options={academicSemesterOptions}
              placeholder="academic semester"
            />
            <PHSelect
              label={"Status"}
              name={"status"}
              options={semesterStatusOptions}
              placeholder="status"
            />
            <PHDatePicker name="startDate" label="Start Date" />
            <PHDatePicker name="endDate" label="End Date" />
            <PHInput
              type="text"
              name="minCredit"
              label="Min Credit"
              placeholder="min credit"
            />
            <PHInput
              type="text"
              name="maxCredit"
              label="Max Credit"
              placeholder="max cedit"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default SemesterRegistration;
