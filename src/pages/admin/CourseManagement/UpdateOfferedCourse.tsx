import { Button, Col, Flex, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {
  useGetAllAcademicFacultiesQuery,
  useGetAllDepartmentQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
  useGetSingleOffredCoursesQuery,
  useUpdateOfferedCourseMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { weekDaysOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const UpdateOfferCourse = () => {
  const { id } = useParams<{ id: string }>();
  //console.log(singleOfferedCoursesData?.data);
  const [academicFacultyId, setAcademicFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();
  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);
  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: departmentData } = useGetAllDepartmentQuery(
    [{ name: "academicFaculty", value: academicFacultyId }],
    { skip: !academicFacultyId }
  );

  const { data: coursetData } = useGetAllCoursesQuery(undefined);
  const [updateOfferedCourse] = useUpdateOfferedCourseMutation();

  const { data: courseFacultyData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const {
    data: singleOfferedCoursesData,
    isLoading,
    isError,
  } = useGetSingleOffredCoursesQuery(id as string);
  //console.log(singleOfferedCoursesData);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <Spin tip="Loading..." />
      </Flex>
    );
  }

  if (isError || !singleOfferedCoursesData?.data) {
    return (
      <Flex align="center" justify="center" style={{ height: "75vh" }}>
        <h2 style={{ fontWeight: "500", color: "#f0665c" }}>
          Something went wrong!
        </h2>
      </Flex>
    );
  }

  const academicFacultiesOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const registeredSemesterOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );
  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const coursetOptions = coursetData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const facultiesOptions = courseFacultyData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const offeredCourseDefaultValues = {
    semesterRegistration:
      singleOfferedCoursesData?.data?.semesterRegistration?._id,
    academicFaculty: singleOfferedCoursesData?.data?.academicFaculty?._id,
    academicDepartment: singleOfferedCoursesData?.data?.academicDepartment?._id,
    course: singleOfferedCoursesData?.data?.course?._id,
    faculty: singleOfferedCoursesData?.data?.faculty?._id,
    section: singleOfferedCoursesData?.data?.section,
    maxCapacity: singleOfferedCoursesData?.data?.maxCapacity,
    days: singleOfferedCoursesData?.data?.days,
    startTime: moment(singleOfferedCoursesData?.data?.startTime, "HH:mm"),
    endTime: moment(singleOfferedCoursesData?.data?.endTime, "HH:mm"),
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...", {
      style: { padding: "10px" },
    });
    const offredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    const updatedData = {
      data: offredCourseData,
      id,
    };
    try {
      const res = (await updateOfferedCourse(updatedData)) as TResponse<any>;
      console.log(res);

      if (res?.error) {
        toast.error(res.error?.data?.message, {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        return;
      } else {
        toast.success("Offered course updated successfully!", {
          duration: 2000,
          id: toastId,
          style: { padding: "10px" },
        });
        navigate("/admin/offered-courses");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, {
        duration: 2000,
        id: toastId,
        style: { padding: "10px" },
      });
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Update Offered Course
      </h2>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={offeredCourseDefaultValues}
          >
            <PHSelect
              label={"Registered Semester"}
              name={"semesterRegistration"}
              options={registeredSemesterOptions}
              placeholder="registered semester"
            />
            <PHSelectWithWatch
              label={"Academic Faculty"}
              name={"academicFaculty"}
              options={academicFacultiesOptions}
              placeholder="academic semester"
              onChange={setAcademicFacultyId}
            />
            <PHSelect
              label={"Academic Department"}
              name={"academicDepartment"}
              options={departmentOptions}
              placeholder="academic department"
              disabled={!academicFacultyId}
            />
            <PHSelectWithWatch
              onChange={setCourseId}
              label={"Course"}
              name={"course"}
              options={coursetOptions}
              placeholder="course"
            />
            <PHSelect
              disabled={!courseId || fetchingFaculties}
              label={"Faculty"}
              name={"faculty"}
              options={facultiesOptions}
              placeholder="faculty"
            />
            <PHInput
              type="text"
              name="section"
              label="Section"
              placeholder="section"
            />
            <PHInput
              type="text"
              name="maxCapacity"
              label="Max Capacity"
              placeholder="max capacity"
            />
            <PHSelect
              mode="multiple"
              options={weekDaysOptions}
              name="days"
              label="Days"
              placeholder="select days"
            />
            <PHTimePicker label="Start Time" name="startTime" />
            <PHTimePicker label="End Time" name="endTime" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default UpdateOfferCourse;
