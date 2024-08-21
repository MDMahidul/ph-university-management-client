/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const navigate = useNavigate();

  const prerequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const CourseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      prerequisiteCourses: data.prerequisiteCourses
        ? data?.prerequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(CourseData)) as TResponse<TCourse>;
      console.log(res);

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Course added successfully!", {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        navigate("/admin/courses");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, { duration: 2000, id: toastId });
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create Course
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm onSubmit={onSubmit}>
            <PHInput type="text" name="title" label="Title" />
            <PHInput type="text" name="prefix" label="Prefix" />
            <PHInput type="text" name="code" label="Code" />
            <PHInput type="text" name="credits" label="Credits" />
            <PHSelect
              mode="multiple"
              options={prerequisiteCoursesOptions}
              label="Prerequisite Courses"
              name="prerequisiteCourses"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateCourse;
