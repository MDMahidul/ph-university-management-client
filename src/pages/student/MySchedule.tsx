import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";
import {Table, TableColumnsType, TableProps } from "antd";
import { TCourse } from "../../types";

type TTableData = Pick<TCourse, "title" | "code">;

const MySchedule = () => {
  const { data: courseData,isLoading,isError } = useGetAllEnrolledCoursesQuery(undefined);
  if(isLoading){
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Something went wrong!</p>;
  }
/*   console.log(courseData?.data);
  console.log(courseData?.data.map((item:any)=>item.course.days)); */
   const tableData = courseData?.data?.map((item:any) => ({
     key: item.course._id,
     title:item.course.title,
     day:item.offeredCourse.days.map((day:string)=>(<span>{day} </span>) ),
     section:item.offeredCourse.section,
   }));

     const columns: TableColumnsType<TTableData> = [
       {
         title: "Title",
         key: "title",
         dataIndex: "title",
       },
       {
         title: "Day",
         key: "day",
         dataIndex: "day",
       },
       {
         
         title: "Section",
         key: "section",
         dataIndex: "section",
       
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
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Schedule Courses
      </h2>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      {/*   {coursesData?.data?.map((item) => {
        return (
          <div>
            <div>{item.course.title}</div>
            <div>{item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((item) => (
                <span> {item}</span>
              ))}
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default MySchedule;
