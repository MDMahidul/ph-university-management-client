import { Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  bloodGroupsOptions,
  adminDesignationOptions,
  genderOptions,
} from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
} from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TAdmin } from "../../../types";
import { useParams } from "react-router-dom";

const AdminUpdate = () => {
  const [updateSingleAdmin] = useUpdateSingleAdminMutation();

  const { adminId } = useParams<{ adminId: string }>();

  const {
    data: adminData,
    isLoading,
    isError,
  } = useGetSingleAdminQuery(adminId as string);

  // Handle loading and error states
  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !adminData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }

  const adminDefaultValues = {
    name: {
      firstName: adminData?.data?.name?.firstName,
      middleName: adminData?.data?.name?.middleName,
      lastName: adminData?.data?.name?.lastName,
    },
    gender: adminData?.data?.gender,
    /*  dateOfBirth: adminData?.data?.dateOfBirth, */
    bloodGroup: adminData?.data?.bloodGroup,
    email: adminData?.data?.email,
    designation: adminData?.data?.designation,
    profileImage: adminData?.data?.profileImage,
    contactNo: adminData?.data?.contactNo,
    emergencyContactNo: adminData?.data?.emergencyContactNo,
    presentAddress: adminData?.data?.presentAddress,
    permanentAddress: adminData?.data?.permanentAddress,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...", {
      style: { padding: "10px" },
    });

    const adminData = {
      admin: data,
    };

    // send data as formdata to server
    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.profileImage);

    // to see fromData data
    //console.log(Object.fromEntries(formData));

    try {
      const res = (await updateSingleAdmin({
        data: adminData,
        id: adminId,
      })) as TResponse<TAdmin>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Admin info updated successfully!", {
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
        Update Admin Info
      </h2>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
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
                <PHSelect
                  label="Designation"
                  name="designation"
                  options={adminDesignationOptions}
                  placeholder="designation"
                />
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

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default AdminUpdate;
