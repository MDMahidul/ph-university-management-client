import { Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  bloodGroupsOptions,
  genderOptions,
  facultyDesignationOptions,
} from "../../../constants/global";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetSingleFacultyQuery,
  useUpdateSingleFacultyMutation,
} from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TFaculty, TAcademicDepartment } from "../../../types";
import {
  useGetAllAcademicFacultiesQuery,
  useGetAllDepartmentQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PHDatePicker from "../../../components/form/PHDatePicker";

const FacultyUpdate = () => {
  const { facultyId } = useParams<{ facultyId: string }>();
  const [updateSingleFaculty] = useUpdateSingleFacultyMutation();

  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [filteredDepartments, setFilteredDepartments] = useState<
    TAcademicDepartment[]
  >([]);

  const { data: academicfacultiesData, isLoading: fIsLoading } =
    useGetAllAcademicFacultiesQuery(undefined);

  //console.log(academicfacultiesData);

  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined);

  //console.log(departmentData);

  const facultiesOptions = academicfacultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  useEffect(() => {
    if (selectedFaculty && departmentData) {
      const filtered = departmentData?.data?.filter(
        (department: TAcademicDepartment) =>
          department.academicFaculty._id === selectedFaculty
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments([]);
    }
  }, [selectedFaculty, departmentData]);

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
  };

  const departmentsOptions = filteredDepartments.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const {
    data: facultyData,
    isLoading,
    isError,
  } = useGetSingleFacultyQuery(facultyId as string);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !facultyData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }

  /* default values */
  const facultyDefaultValues = {
    name: {
      firstName: facultyData?.data?.name?.firstName,
      middleName: facultyData?.data?.name?.middleName,
      lastName: facultyData?.data?.name?.lastName,
    },
    gender: facultyData?.data?.gender,
    dateOfBirth: facultyData?.data?.dateOfBirth,
    bloodGroup: facultyData?.data?.bloodGroup,
    email: facultyData?.data?.email,
    designation: facultyData?.data?.designation,
    profileImage: facultyData?.data?.profileImage,
    contactNo: facultyData?.data?.contactNo,
    emergencyContactNo: facultyData?.data?.emergencyContactNo,
    presentAddress: facultyData?.data?.presentAddress,
    permanentAddress: facultyData?.data?.permanentAddress,
    /* academicFaculty: facultyData?.data?.academicFaculty?.name,
    academicDepartment: facultyData?.data?.academicDepartment?.name, */
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...", {
      style: { padding: "10px" },
    });

    const facultyData = {
      faculty: data,
    };

    // send data as formdata to server
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImage);

    // to see fromData data
    console.log(facultyData);

    try {
      const res = (await updateSingleFaculty({
        data: facultyData,
        id: facultyId,
      })) as TResponse<TFaculty>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Faculty data updated successfully!", {
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
        Update Faculty Info
      </h2>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
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

export default FacultyUpdate;
