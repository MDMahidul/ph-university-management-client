import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useDeleteFacultyMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/userManagement.api";
import { TFaculty, TQueryParams, TResponse } from "../../../types";
import { Link } from "react-router-dom";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import DeleteModal from "../../../components/modal/DeleteModal";
import { toast } from "sonner";
import { useState } from "react";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

type TTableData = Pick<
  TFaculty,
  | "fullName"
  | "id"
  | "email"
  | "contactNo"
  | "user"
  | "academicFaculty"
  | "academicDepartment"
>;

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const { data: facultiesData, isFetching } = useGetAllFacultiesQuery([
    /* { name: "limit", value: 3 }, */
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const { data: academicFacultiesData } = useGetAllAcademicFacultiesQuery([]);

  const [deleteFaculty] = useDeleteFacultyMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = (await deleteFaculty(id)) as TResponse<TFaculty>;
      if (res?.error) {
        toast.error(res.error?.data?.message, { duration: 2000 });
        return;
      } else {
        toast.success("Faculty deleted successfully!", {
          duration: 2000,
        style: { padding: "10px" }
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, {
        duration: 2000,
        style: { padding: "10px" },
      });
    }
  };

  const metaData = facultiesData?.meta;

  const tableData = facultiesData?.data?.map(
    ({
      _id,
      fullName,
      id,
      email,
      contactNo,
      academicDepartment,
      academicFaculty,
      user,
    }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      academicDepartment: academicDepartment?.name ,
      academicFaculty: academicFaculty?.name ,
      user,
    })
  );

  const facultyFilterOptions = academicFacultiesData?.data
    ? academicFacultiesData?.data.map((faculty) => ({
        text: faculty.name,
        value: faculty._id,
      }))
    : [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
      filters: facultyFilterOptions,
    },
    {
      title: "Department",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/faculty-data/${item.key}`}>
              <Button>Details</Button>
            </Link>

            <Link to={`/admin/update-faculty-data/${item.key}`}>
              <Button>
                <FormOutlined />
              </Button>
            </Link>
            <DeleteModal
              icon={<DeleteOutlined />}
              title="Confirm"
              mText="Do you want to delete this faculty?"
              onConfirm={() => handleDelete(item?.key)}
            />
          </Space>
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
      const queryParams: TQueryParams[] = [];

       if (filters.academicFaculty) {
         filters.academicFaculty.forEach((item) =>
           queryParams.push({ name: "academicFaculty", value: item })
         );
       }
      setParams(queryParams);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Faculties List
      </h2>
      <Table
        dataSource={tableData}
        loading={isFetching}
        columns={columns}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        align="center"
        style={{ marginTop: "15px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default FacultyData;
