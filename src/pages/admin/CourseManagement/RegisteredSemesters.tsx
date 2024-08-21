import {
  Dropdown,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import moment from "moment";
import { TResponse, TSemester } from "../../../types";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { Button } from "antd/es/radio";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;

const items = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const RegistredSemester = () => {
  //const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [semesterId, setSemesterId] = useState("");

  const { data: semesterData, isFetching } = useGetAllRegisteredSemestersQuery([
    { name: "page", value: page },
  ]);
  const metaData = semesterData?.meta;
  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();

  const handleStatusUpdate = async (data: FieldValues) => {
    try {
      const updateData = {
        id: semesterId,
        data: {
          status: data.key,
        },
      };

      const res = (await updateRegisteredSemester(
        updateData
      )) as TResponse<TSemester>;
      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Faculty data updated successfully!", {
          duration: 2000,
          style: { padding: "10px" },
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong !", {
        duration: 2000,
        style: { padding: "10px" },
      });
    }
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setSemesterId(item.key)}>Update</Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      /* const queryParams: TQueryParams[] = [];
      setParams(queryParams); */
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Registered Semesters
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

export default RegistredSemester;
