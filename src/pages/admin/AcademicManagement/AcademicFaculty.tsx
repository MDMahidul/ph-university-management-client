import { Button, Table, TableColumnsType } from "antd";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

type TFacultyTableData = Pick<TAcademicFaculty, "_id" | "name">;

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } = useGetAllFacultiesQuery(undefined);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    _id,
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
      render: () => {
        return (
          <div>
            <Button>Update</Button>
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
