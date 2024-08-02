import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../../../redux/features/admin/userManagement.api";
import { TAdmin, TQueryParams, TResponse } from "../../../types";
import { Link } from "react-router-dom";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import DeleteModal from "../../../components/modal/DeleteModal";
import { useState } from "react";
import { toast } from "sonner";

type TTableData = Pick<
  TAdmin,
  "fullName" | "id" | "email" | "contactNo" | "user"
>;

const AdminData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const [deleteAdmin] = useDeleteAdminMutation();

  const { data: adminsData, isFetching } = useGetAllAdminsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const handleDelete = async (id: string) => {
    try {
      const res = (await deleteAdmin(id)) as TResponse<TAdmin>;
      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Admin deleted successfully!", {
          duration: 2000,
          style: { padding: "10px" },
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

  const metaData = adminsData?.meta;

  const tableData = adminsData?.data?.map(
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
            <Link to={`/admin/admin-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/update-admin-data/${item.key}`}>
              <Button>
                <FormOutlined />
              </Button>
            </Link>
            <DeleteModal
              icon={<DeleteOutlined />}
              title="Confirm"
              mText="Do you want to delete this admin?"
              onConfirm={() => handleDelete(item?.key)}
            />
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      setParams(queryParams);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admins Data</h2>
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
    </div>
  );
};

export default AdminData;
