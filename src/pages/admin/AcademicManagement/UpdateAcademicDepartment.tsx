import { Button, Col, Flex, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllAcademicFacultiesQuery,
  useGetsingleAcademicDepartmentQuery,
  useUpdateSingleAcademicDepartmentMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAcademicDepartment = () => {
  const { departmentId } = useParams<{ departmentId: string }>();

  const navigate = useNavigate();

  const [updateSingleAcademicDepartment] =
    useUpdateSingleAcademicDepartmentMutation();

  const { data: academicfacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const facultyOptions = academicfacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const {
    data: academicDepartmentData,
    isLoading,
    isError,
  } = useGetsingleAcademicDepartmentQuery(departmentId);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !academicDepartmentData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }

  /* default values */
  const academicDepartmentDefaultValues = {
    name: academicDepartmentData?.data?.name,
    academicFaculty: academicDepartmentData?.data?.academicFaculty._id,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...",{
        style: { padding: "10px" }});

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await updateSingleAcademicDepartment({
        data: departmentData,
        id: departmentId,
      })) as TResponse<TAcademicDepartment>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        navigate("/admin/academic-department");
        toast.success("Department updated successfully!", {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
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
        Update Academic Department
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={academicDepartmentDefaultValues}
          >
            <PHInput
              type="text"
              name="name"
              label="Department Name"
              placeholder="department name"
            />
            <PHSelect
              options={facultyOptions!}
              name="academicFaculty"
              label="Select Academic Faculty"
              placeholder="faculty name"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default UpdateAcademicDepartment;
