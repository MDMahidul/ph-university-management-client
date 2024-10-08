import { Button, Table, TableColumnsType } from "antd";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { Link } from "react-router-dom";

type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAllDepartmentQuery(undefined);
  console.log(departmentData?.data);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Link to={`/admin/update-academic-department/${item.key}`}>
              <Button>Update</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Academic Departments
      </h2>
      <Table columns={columns} dataSource={tableData} loading={isFetching} />
    </div>
  );
};

export default AcademicDepartment;
