import AcademicDepartment from "../pages/admin/AcademicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/AcademicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/AcademicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/AcademicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/AcademicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/AcademicManagement/CreateAcademicSemester";
import UpdateAcademicDepartment from "../pages/admin/AcademicManagement/UpdateAcademicDepartment";
import UpdateAcademicFaculty from "../pages/admin/AcademicManagement/UpdateAcademicFaculty";
import UpdateAcademicSemester from "../pages/admin/AcademicManagement/UpdateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminData from "../pages/admin/UserManagement/AdminData";
import AdminDetails from "../pages/admin/UserManagement/AdminDetails";
import AdminUpdate from "../pages/admin/UserManagement/AdminUpdate";
import CreateAdmin from "../pages/admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/admin/UserManagement/CreateStudent";
import FacultyData from "../pages/admin/UserManagement/FacultyData";
import FacultyDetails from "../pages/admin/UserManagement/FacultyDetails";
import FacultyUpdate from "../pages/admin/UserManagement/FacultyUpdate";
import StudentDetails from "../pages/admin/UserManagement/StudentDetails";
import StudentsData from "../pages/admin/UserManagement/StudentsData";
import StudentUpdate from "../pages/admin/UserManagement/StudentUpdate";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A.Semester",
        path: "create-academic-semesters",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        path: "update-academic-semester/:semesterId",
        element: <UpdateAcademicSemester />,
      },
      {
        name: "Create A.Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        path: "update-academic-faculty/:academicFacultyId",
        element: <UpdateAcademicFaculty />,
      },
      {
        name: "Create A.Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        path: "update-academic-department/:departmentId",
        element: <UpdateAcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "student-data",
        element: <StudentsData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "update-student-data/:studentId",
        element: <StudentUpdate />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admins",
        path: "admin-data",
        element: <AdminData />,
      },
      {
        path: "admin-data/:adminId",
        element: <AdminDetails />,
      },
      {
        path: "update-admin-data/:adminId",
        element: <AdminUpdate />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculties",
        path: "faculty-data",
        element: <FacultyData />,
      },
      {
        path: "faculty-data/:facultyId",
        element: <FacultyDetails />,
      },
      {
        path: "update-faculty-data/:facultyId",
        element: <FacultyUpdate />,
      },
    ],
  },
];
