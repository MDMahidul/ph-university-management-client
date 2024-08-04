import { Button, Col, Flex, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetsingleAcademicFacultyQuery,
  useUpdateSingleAcademicFacultyMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAcademicFaculty = () => {
  const { academicFacultyId } = useParams<{ academicFacultyId: string }>();
  const navigate = useNavigate();

  const [updateSingleAcademicFaculty] =
    useUpdateSingleAcademicFacultyMutation();

  const {
    data: academicFacultyData,
    isLoading,
    isError,
  } = useGetsingleAcademicFacultyQuery(academicFacultyId);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !academicFacultyData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }

  console.log(academicFacultyData);
  /* default values */
  const academicFacultyDefaultValues = {
    name: academicFacultyData?.data?.name,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...",{
        style: { padding: "10px" }});

    const facultyName = {
      name: data.name,
    };

    try {
      const res = (await updateSingleAcademicFaculty({
        data: facultyName,
        id: academicFacultyId,
      })) as TResponse<TAcademicFaculty>;
      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        navigate("/admin/academic-faculty");
        toast.success("Academic faculty updated successfully!", {
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
        Update Academic Faculty
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={academicFacultyDefaultValues}
          >
            <PHInput
              type="text"
              name="name"
              label="Faculty Name"
              placeholder="faculty name"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default UpdateAcademicFaculty;
