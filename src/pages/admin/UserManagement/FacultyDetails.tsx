import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../redux/features/admin/userManagement.api";
import { Card, Col, Divider, Flex, Image, Row, Spin, Table } from "antd";
import "../../../styles/style.css";

const FacultyDetails = () => {
  const { facultyId } = useParams<{ facultyId: string }>();

  const {
    data: facultyData,
    isLoading,
    isError,
  } = useGetSingleFacultyQuery(facultyId as string);

  // Handle loading and error states
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

  // Safely access faculty data
  const {
    fullName,
    profileImage,
    id,
    gender,
    dateOfBirth,
    email,
    designation,
    academicFaculty,
    academicDepartment,
    emergencyContactNo,
    contactNo,
    permanentAddress,
    presentAddress,
  } = facultyData.data;

  const data = [
    {
      key: "1",
      field: "Admin Name:",
      value: fullName,
    },
    {
      key: "2",
      field: "Admin ID:",
      value: id,
    },
    {
      key: "3",
      field: "Gender:",
      value: gender,
    },
    {
      key: "4",
      field: "DOB:",
      value: dateOfBirth.slice(0, 10),
    },
    {
      key: "5",
      field: "Designation:",
      value: designation,
    },
    {
      key: "6",
      field: "Department:",
      value: `${academicDepartment?.name} , ${academicFaculty?.name}`,
    },
  ];

  const columns = [
    {
      dataIndex: "field",
      key: "field",
      render: (text: any) => <p className="item-label">{text}</p>, // Apply custom class here
    },
    {
      dataIndex: "value",
      key: "value",
      render: (text: any) => <p>{text}</p>, // Apply custom styling if needed
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Faculty Details
      </h2>
      <Card style={{ width: "100%" }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className="gutter-row custom-col"
            style={{ textAlign: "center", marginBottom: "10px" }}
            span={24}
            sm={{ span: 10 }}
            md={{ span: 8 }}
            lg={{ span: 10 }}
            xl={{ span: 8 }}
          >
            <Image
              className="responsive-image"
              preview={false}
              src={profileImage}
            />
          </Col>
          <Col
            className="gutter-row"
            span={24}
            sm={{ span: 14 }}
            md={{ span: 12 }}
            lg={{ span: 14 }}
            xl={{ span: 12 }}
          >
            <Table
              columns={columns}
              rowHoverable={false}
              dataSource={data}
              pagination={false}
              showHeader={false}
              className="custom-table" // Apply custom class here
            />
          </Col>
        </Row>
      </Card>
      <Card style={{ width: "100%", marginTop: "25px", paddingBottom: "20px" }}>
        <Divider>Contact Info</Divider>
        <Row gutter={40}>
          <Col span={24} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 12 }}>
            <div
              style={{
                padding: "7px",
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <span className="item-label" style={{ marginRight: "20px" }}>
                Email :
              </span>
              {email}
            </div>
            <div
              style={{
                padding: "7px",
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <span className="item-label" style={{ marginRight: "20px" }}>
                Contact No :
              </span>
              {contactNo}
            </div>
            <div
              style={{
                padding: "7px",
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <span className="item-label" style={{ marginRight: "20px" }}>
                Emergency Contact No :
              </span>
              {emergencyContactNo}
            </div>
          </Col>
          <Col span={24} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 12 }}>
            <div
              style={{
                padding: "7px",
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <span className="item-label" style={{ marginRight: "20px" }}>
                Present Address :
              </span>
              {presentAddress}
            </div>
            <div
              style={{
                padding: "7px",
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <span className="item-label" style={{ marginRight: "20px" }}>
                Permanent Address :
              </span>
              {permanentAddress}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FacultyDetails;
