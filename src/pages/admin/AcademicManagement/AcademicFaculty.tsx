import { Button, Table, TableColumnsType } from "antd";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { Link } from "react-router-dom";

type TFacultyTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);

  const tableData = academicFacultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TFacultyTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "ID",
      key: "_id",
      dataIndex: "_id",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Link to={`/admin/update-academic-faculty/${item?.key}`}>
              <Button>Update</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Academic Faculties
      </h2>
      <Table dataSource={tableData} loading={isFetching} columns={columns} />
    </>
  );
};

export default AcademicFaculty;
