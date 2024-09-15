import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { Link } from "react-router-dom";
import {
  useDeleteOfferedCoursesMutation,
  useGetOffredCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import DeleteModal from "../../../components/modal/DeleteModal";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useState } from "react";

type TFacultyTableData = Pick<TAcademicFaculty, "name">;

const OfferedCourses = () => {
  const [page, setPage] = useState(1);
  const { data: offeredCoursesData, isFetching } = useGetOffredCoursesQuery([
    { name: "page", value: page },
  ]);

  const [deleteOfferedCourses] = useDeleteOfferedCoursesMutation();

  const metaData = offeredCoursesData?.meta;

  const tableData = offeredCoursesData?.data?.map((item) => ({
    key: item._id,
    course: item?.course?.title,
    semester: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
    days: `${item?.days} `,
    time: `${item?.startTime} - ${item?.endTime}`,
    academicDepartment: item?.academicDepartment?.name,
    faculty: item?.faculty?.fullName,
  }));

  const handleDelete = async (id: string) => {
    try {
      const res = (await deleteOfferedCourses(id)) as TResponse<any>;

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Offered course deleted successfully!", {
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

  const columns: TableColumnsType<TFacultyTableData> = [
    {
      title: "Course",
      key: "course",
      dataIndex: "course",
    },
    {
      title: "Semester",
      key: "semester",
      dataIndex: "semester",
    },
    {
      title: "Days",
      key: "days",
      dataIndex: "days",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Faculty",
      key: "faculty",
      dataIndex: "faculty",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/update-offered-courses/${item.key}`}>
              <Button>
                <FormOutlined />
              </Button>
            </Link>

            <DeleteModal
              icon={<DeleteOutlined />}
              title="Confirm"
              mText="Do you want to delete this Offered course?"
              onConfirm={() => handleDelete(item.key)}
            />
          </Space>
        );
      },
    },
  ];
 
  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Offered Courses
      </h2>
      <Table
        dataSource={tableData}
        loading={isFetching}
        columns={columns}
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

export default OfferedCourses;
