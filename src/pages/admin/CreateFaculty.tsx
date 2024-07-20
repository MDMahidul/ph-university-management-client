import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicManagementSchema } from "../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../types";
import { TAcademicFaculty } from "../../types/academicManagement.type";

const CreateFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const facultyName = { name: data.name };

    try {
      const res = (await addAcademicFaculty(
        facultyName
      )) as TResponse<TAcademicFaculty>;
      if (res?.error) {
        toast.error(res.error?.data?.message, { duration: 2000, id: toastId });
        return;
      } else {
        toast.success("Faculty added successfully!", {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, { duration: 2000, id: toastId });
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create Academic Faculty
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(
              academicManagementSchema.academicFacultySchema
            )}
          >
            <PHInput type="text" name="name" label="Faculty Name" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateFaculty;
