import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { TCourse, TResponse} from "../../../types";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

type TTableData = Pick<TCourse, "title" | "code">;

const Courses = () => {
  const [page, setPage] = useState(1);
  const { data: coursesData, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
  ]);
  const metaData = coursesData?.meta;

  const tableData = coursesData?.data?.map(({ _id, title, code }) => ({
    key: _id,
    title,
    code,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal courseInfo={item} />;
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Courses</h2>
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

const AddFacultyModal = ({ courseInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [assignFaculties] = useAssignFacultiesMutation();

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: FieldValues) => {
    const facultyData = { courseId: courseInfo.key, data };
    try {
      const res = (await assignFaculties(facultyData)) as TResponse<TCourse>;
      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Faculty assigned successfully!", {
          duration: 2000,
          style: { padding: "10px" },
        });
        setIsModalOpen(false);
      }
    } catch (error:any) {
      toast.error(error?.data?.message || "Something went wrong !", {
        duration: 2000,
        style: { padding: "10px" },
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Faculty
      </Button>
      <Modal
        title="Assign Faculties"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            options={facultiesOptions}
            label="Select Faculties"
            name="faculties"
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
