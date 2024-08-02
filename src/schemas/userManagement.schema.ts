import { z } from "zod";
import {
  adminDesignation,
  bloodGroups,
  facultyDesignation,
  genders,
} from "../constants/global";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .max(20, "First name cannot be more than 20 characters")
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "First name must be capitalized",
      }
    ),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father name is required"),
  fatherOccupation: z.string().nonempty("Father occupation is required"),
  fatherContactNo: z.string().nonempty("Father contact is required"),
  motherName: z.string().nonempty("Mother name is required"),
  motherOccupation: z.string().nonempty("Mother occupation is required"),
  motherContactNo: z.string().nonempty("Mother contact is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("LG name is required"),
  occupation: z.string().nonempty("LG occupation is required"),
  contactNo: z.string().nonempty("LG contact is required"),
  address: z.string().nonempty("LG address is required"),
});

// Main schema: Student
const createStudentValidationSchema = z.object({
  password: z.string().max(20).optional(),
  name: userNameValidationSchema,
  /* gender: z.enum(["male", "female", "others"], {
    errorMap: () => ({
      message: "Gender can only be 'male', 'female', or 'others'",
    }),
  }), */
  gender: z
    .enum([...genders] as [string, ...string[]])
    .refine((val) => genders.includes(val), {
      message: "Gender can only be 'male', 'female', or 'others'",
    }),
  dateOfBirth: z.string().optional(),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  contactNo: z.string().nonempty("Contact is required"),
  emergencyContactNo: z.string().nonempty("Emergency contact is required"),
  bloodGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
  presentAddress: z.string().nonempty("Present address is required"),
  permanentAddress: z.string().nonempty("Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  //  profileImage: z.string().optional(),
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid file type"
    ),
  admissionSemester: z.string(),
  academicDepartment: z.string(),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  name: updateUserNameValidationSchema,
  //gender: z.enum(["male", "female", "other"]).optional(),
  gender: z.enum([...genders] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  guardian: updateGuardianValidationSchema.optional(),
  localGuardian: updateLocalGuardianValidationSchema.optional(),
  admissionSemester: z.string().optional(),
  profileImage: z.string().optional(),
  academicDepartment: z.string().optional(),
});

const createAdminValidationSchema = z.object({
  name: userNameValidationSchema,
  designation: z.enum([...adminDesignation] as [string, ...string[]], {
    message: "Designation is required!",
  }),
  gender: z
    .enum([...genders] as [string, ...string[]])
    .refine((val) => genders.includes(val), {
      message: "Gender can only be 'male', 'female', or 'others'",
    }),
  dateOfBirth: z.string().optional(),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  contactNo: z.string().nonempty("Contact is required"),
  emergencyContactNo: z.string().nonempty("Emergency contact is required"),
  bloodGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
  presentAddress: z.string().nonempty("Present address is required"),
  permanentAddress: z.string().nonempty("Permanent address is required"),
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid file type"
    ),
  /* profileImage: z.string().optional(), */
  /* managementDepartment: z.string(), */
});

const updateAdminValidationSchema = z.object({
  name: updateUserNameValidationSchema.optional(),
  designation: z
    .enum([...adminDesignation] as [string, ...string[]])
    .optional(),
  gender: z.enum([...genders] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloogGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  /*  profileImage: z.string().optional(), 
      managementDepartment: z.string().optional(),*/
});

const createFacultyValidationSchema = z.object({
  name: userNameValidationSchema,
  designation: z.enum([...facultyDesignation] as [string, ...string[]], {
    message: "Designation is required!",
  }),
  gender: z
    .enum([...genders] as [string, ...string[]])
    .refine((val) => genders.includes(val), {
      message: "Gender can only be 'male', 'female', or 'others'",
    }),
  dateOfBirth: z.string().optional(),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  contactNo: z.string().nonempty("Contact is required"),
  emergencyContactNo: z.string().nonempty("Emergency contact is required"),
  bloodGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
  presentAddress: z.string().nonempty("Present address is required"),
  permanentAddress: z.string().nonempty("Permanent address is required"),
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid file type"
    ),
  academicDepartment: z.string().nonempty("This field is required"),
  academicFaculty: z.string().nonempty("This field is required"),
});

const updateFacultyValidationSchema = z.object({
  name: updateUserNameValidationSchema.optional(),
  designation: z
    .enum([...facultyDesignation] as [string, ...string[]])
    .optional(),
  gender: z.enum([...genders] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloogGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  /* profileImg: z.string().optional(), */
  academicDepartment: z.string().optional(),
  academicFaculty: z.string().optional(),
});

export const userValidationSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
  createAdminValidationSchema,
  updateAdminValidationSchema,
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
