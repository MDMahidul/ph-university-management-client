import { z } from "zod";

const academicSemesterSchema = z.object({
  name: z.string({ required_error: "This field is required" }),
  year: z.string({ required_error: "This field is required" }),
  startMonth: z.string({ required_error: "This field is required" }),
  endMonth: z.string({ required_error: "This field is required" }),
});

const academicFacultySchema = z.object({
  name: z.string({ required_error: "This field is required" }),
});

const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "This field is required" }),
  academicFaculty: z.string({ required_error: "This field is required" }),
});

export const academicManagementSchema = {
  academicSemesterSchema,
  academicFacultySchema,
  academicDepartmentSchema,
};
