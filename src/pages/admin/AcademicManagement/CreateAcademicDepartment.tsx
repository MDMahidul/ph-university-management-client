import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { academicManagementSchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  
  const { data: academicfacultyData } = useGetAllAcademicFacultiesQuery(undefined);
  console.log(academicfacultyData);

  const facultyOptions = academicfacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...",{
      style: { padding: "10px" },
    });

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Department added successfully!", {
          duration: 2000,
          id: toastId,
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
        Create Academic Department
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(
              academicManagementSchema.academicDepartmentSchema
            )}
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

export default CreateAcademicDepartment;
