import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  bloodGroupsOptions,
  genderOptions,
  facultyDesignationOptions,
} from "../../../constants/global";
import {
  useGetAllAcademicFacultiesQuery,
  useGetAllDepartmentQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useEffect, useState } from "react";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { TAcademicDepartment, TFaculty, TResponse } from "../../../types";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "../../../schemas/userManagement.schema";

const facultyDefaultValues = {
  name: {
    firstName: "MR.",
    middleName: "Faculty",
    lastName: "No. ",
  },
  gender: "male",

  bloodGroup: "A+",

  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
};

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();

  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const [filteredDepartments, setFilteredDepartments] = useState<
    TAcademicDepartment[]
  >([]);

  /* get all academic faculy and department data to create select options */
  const { data: academicfacultyData, isLoading: fIsLoading } =
    useGetAllAcademicFacultiesQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined);

  const facultiesOptions = academicfacultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  /* choose department according to the selected faculty */
  useEffect(() => {
    if (selectedFaculty && departmentData) {
      const filtered = departmentData?.data?.filter(
        (department: TAcademicDepartment) =>
          department.academicFaculty._id === selectedFaculty
      );
      setFilteredDepartments(filtered);
    }
  }, [selectedFaculty, departmentData]);

  /* to handle selected faculty */
  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
  };

  const departmentsOptions = filteredDepartments.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...", {
      style: { padding: "10px" },
    });

    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    // send data as formdata to server
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImage);

    // to see fromData data
    console.log(facultyData);

    try {
      const res = (await addFaculty(formData)) as TResponse<TFaculty>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Faculty added successfully!", {
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
        Create Faculty
      </h2>
      <Row>
        <Col span={24}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={facultyDefaultValues}
            resolver={zodResolver(
              userValidationSchema.createFacultyValidationSchema
            )}
          >
            <Divider>Personal Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="First Name"
                  name="name.firstName"
                  type="text"
                  placeholder="first name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Middle Name"
                  name="name.middleName"
                  type="text"
                  placeholder="middle name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Last Name"
                  name="name.lastName"
                  type="text"
                  placeholder="last name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  placeholder="Gender"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  label="Blood Group"
                  name="bloodGroup"
                  options={bloodGroupsOptions}
                  placeholder="blood group"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHDatePicker label="D.O.B." name="dateOfBirth" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Controller
                  name="profileImage"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Profile Image">
                      <Input
                        type="file"
                        value={value?.fileName}
                        size="large"
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            <Divider>Academic Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  label="Designation"
                  name="designation"
                  options={facultyDesignationOptions}
                  placeholder="designation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  disabled={fIsLoading}
                  label="Academic Faculty"
                  name="academicFaculty"
                  options={facultiesOptions}
                  placeholder="academicFaculty"
                  onChange={handleFacultyChange}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  disabled={dIsLoading || !selectedFaculty}
                  label="Academic Department"
                  name="academicDepartment"
                  options={departmentsOptions}
                  placeholder="Academic Department"
                />
              </Col>
            </Row>

            <Divider>Contact Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="example@email.com"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Contact"
                  name="contactNo"
                  type="text"
                  placeholder="01XXXXXXXXX"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Emergency Contact"
                  name="emergencyContactNo"
                  type="text"
                  placeholder="01XXXXXXXXX"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Permanent Address"
                  name="permanentAddress"
                  type="text"
                  placeholder="permanent Address"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  label="Present Address"
                  name="presentAddress"
                  type="text"
                  placeholder="present Address"
                />
              </Col>
            </Row>

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateFaculty;
