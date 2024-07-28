import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams, TResponse, TStudent } from "../../../types";
import { useState } from "react";
import {
  useBlockStudentMutation,
  useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import DeleteModal from "../../../components/modal/DeleteModal";

type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "user"
>;

const StudentsData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const [blockStudent] = useBlockStudentMutation();

  /* function for blocking student */
  const handleBlock = async (id: string) => {
    const blockData = { status: "blocked" };
    try {
      const res = (await blockStudent({
        data: blockData,
        id,
      })) as TResponse<TStudent>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Student blocked successfully!", {
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

  const { data: studentsData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentsData?.meta;

  const tableData = studentsData?.data?.map(
    ({ _id, fullName, id, email, contactNo, user }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      user,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "ID No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/update-student-data/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <DeleteModal
              title="Confirm"
              mText="Do you want to block this student?"
              disabled={item?.user?.status === "blocked"}
              status={item?.user?.status === "blocked" ? "Blocked" : "Block"}
              onConfirm={() => handleBlock(item?.user?._id)}
            />
          </Space>
        );
      },
      width: "1%",
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

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Students Data
      </h2>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
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

export default StudentsData;
