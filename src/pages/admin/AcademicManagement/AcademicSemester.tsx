import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParams } from "../../../types";
import { useState } from "react";
import { Link } from "react-router-dom";

// pick specific filed from the TAcademicSemester type for the TTableData type
type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);

  const { data: semesterData, isFetching } = useGetAllSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        { text: "Autumn", value: "Autumn" },
        { text: "Fall", value: "Fall" },
        { text: "Summer", value: "Summer" },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        { text: "2024", value: "2024" },
        { text: "2025", value: "2025" },
        { text: "2026", value: "2026" },
      ],
    },
    { title: "Start Month", key: "startMonth", dataIndex: "startMonth" },
    { title: "End Month", key: "endMonth", dataIndex: "endMonth" },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Link to={`/admin/update-academic-semester/${item.key}`}>
              <Button>Update</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      // create a array to hold the name and value for the search params
      const queryParams: TQueryParams[] = [];

      // push search params name and value for name filter
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      // push search params name and value for year filter
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      // finally set the array to the params state
      setParams(queryParams);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Academic Semester
      </h2>
      <Table
        onChange={onChange}
        dataSource={tableData}
        loading={isFetching}
        columns={columns}
      />
    </>
  );
};

export default AcademicSemester;
