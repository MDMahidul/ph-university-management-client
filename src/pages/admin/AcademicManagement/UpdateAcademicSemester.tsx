import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Spin } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetsingleAcademicSemesterQuery,
  useUpdateSingleAcademicSemesterMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicSemester, TResponse } from "../../../types";
import { semesterOptions } from "../../../constants/semester";
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

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const UpdateAcademicSemester = () => {
  const { semesterId } = useParams<{ semesterId: string }>();

  const navigate = useNavigate();
  const [updateSingleAcademicSemester] =
    useUpdateSingleAcademicSemesterMutation();

  const {
    data: academicSemesterData,
    isLoading,
    isError,
  } = useGetsingleAcademicSemesterQuery(semesterId);
  console.log(academicSemesterData);
  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !academicSemesterData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }

  /* default values */
  const currentNameOption = nameOptions.find(
    (option) => option.label === academicSemesterData?.data?.name
  );
  const academicSemesterDefaultValues = {
    name: currentNameOption?.value || "",
    year: academicSemesterData?.data?.year,
    code: academicSemesterData?.data?.code,
    startMonth: academicSemesterData?.data?.startMonth,
    endMonth: academicSemesterData?.data?.endMonth,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...",{
        style: { padding: "10px" }});

    //const name = nameOptions[Number(data.name) - 1]?.label;
    const nameOption = nameOptions.find((option) => option.value === data.name);
    const name = nameOption?.label;
    const code = nameOption?.value;
    const semesterData = {
      name,
      code,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await updateSingleAcademicSemester({
        data: semesterData,
        id: semesterId,
      })) as TResponse<TAcademicSemester>;
      console.log(res);

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Semester updated successfully!", {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        navigate("/admin/academic-semesters");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, {
        duration: 2000,
        id: toastId,
        style: { padding: "10px" },
      });
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Update Academic Semester
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={academicSemesterDefaultValues}
          >
            <PHSelect
              label={"Name"}
              name={"name"}
              options={semesterOptions}
              placeholder="semester name"
            />
            <PHSelect
              label={"Year"}
              name={"year"}
              options={yearOptions}
              placeholder="year"
            />
            <PHSelect
              label={"Start Month"}
              name={"startMonth"}
              options={monthOptions}
              placeholder="start month"
            />
            <PHSelect
              label={"End Month"}
              name={"endMonth"}
              options={monthOptions}
              placeholder="end month"
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default UpdateAcademicSemester;
