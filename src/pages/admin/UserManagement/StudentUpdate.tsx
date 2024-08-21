import { Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupsOptions, genderOptions } from "../../../constants/global";
import {
  useGetAllDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleStudentQuery,
  useUpdateSingleStudentMutation,
} from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TStudent } from "../../../types";
import PHDatePicker from "../../../components/form/PHDatePicker";

const StudentUpdate = () => {
  const [updateSingleStudent] = useUpdateSingleStudentMutation();
  const navigate = useNavigate();

  const { studentId } = useParams<{ studentId: string }>();
  const { data: dData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined);

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const {
    data: studentData,
    isLoading,
    isError,
  } = useGetSingleStudentQuery(studentId as string);
  // Handle loading and error states
  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !studentData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }
  console.log(studentData);

  const studentDefaultValues = {
    name: {
      firstName: studentData?.data?.name?.firstName,
      middleName: studentData?.data?.name?.middleName,
      lastName: studentData?.data?.name?.lastName,
    },
    gender: studentData?.data?.gender,
    /*  dateOfBirth: studentData?.data?.dateOfBirth, */
    bloodGroup: studentData?.data?.bloodGroup,
    email: studentData?.data?.email,
    profileImage: studentData?.data?.profileImage,
    contactNo: studentData?.data?.contactNo,
    emergencyContactNo: studentData?.data?.emergencyContactNo,
    presentAddress: studentData?.data?.presentAddress,
    permanentAddress: studentData?.data?.permanentAddress,

    guardian: {
      fatherName: studentData?.data?.guardian?.fatherName,
      fatherOccupation: studentData?.data?.guardian?.fatherOccupation,
      fatherContactNo: studentData?.data?.guardian?.fatherContactNo,
      motherName: studentData?.data?.guardian?.motherName,
      motherOccupation: studentData?.data?.guardian?.motherOccupation,
      motherContactNo: studentData?.data?.guardian?.motherContactNo,
    },

    localGuardian: {
      name: studentData?.data?.localGuardian?.name,
      occupation: studentData?.data?.localGuardian?.occupation,
      contactNo: studentData?.data?.localGuardian?.contactNo,
      address: studentData?.data?.localGuardian?.address,
    },

    admissionSemester: studentData?.data?.admissionSemester?._id,
    academicDepartment: studentData?.data?.academicDepartment?._id,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");

    const studentData = {
      student: data,
    };

    //console.log(studentData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImage);

    // to see fromData data
    //console.log(Object.fromEntries(formData));

    try {
      const res = (await updateSingleStudent({
        data: studentData,
        id: studentId,
      })) as TResponse<TStudent>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Student data updated successfully!", {
          duration: 2000,
          id: toastId,
        style: { padding: "10px" }
        });
        navigate("/admin/student-data");
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
        Update Student Data
      </h2>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
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

            <Divider>Guardian Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                  placeholder="Father Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                  placeholder="Father Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father ContactNo"
                  placeholder="01XXXXXXXXX"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                  placeholder="Mother Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                  placeholder="Mother Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother ContactNo"
                  placeholder="01XXXXXXXXX"
                />
              </Col>
            </Row>

            <Divider>Local Guardian Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.name"
                  label="Name"
                  placeholder="L. Guardian Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.occupation"
                  label="Occupation"
                  placeholder="Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.contactNo"
                  label="Contact No."
                  placeholder="01XXXXXXXXX"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.address"
                  label="Address"
                  placeholder="Address"
                />
              </Col>
            </Row>

            <Divider>Academic Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  options={semesterOptions}
                  disabled={sIsLoading}
                  name="admissionSemester"
                  label="Admission Semester"
                  placeholder="Select Semester"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  options={departmentOptions}
                  disabled={dIsLoading}
                  name="academicDepartment"
                  label="Admission Department"
                  placeholder="Select Department"
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

export default StudentUpdate;
