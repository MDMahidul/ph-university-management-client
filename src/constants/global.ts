export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genders = ["male", "female", "others"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const adminDesignation = ["Admin", "Moderator"];

export const facultyDesignation = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Senior Lecturer",
  "Instructor",
];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = genders.map((item) => ({
  value: item,
  label: item,
}));

export const bloodGroupsOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const adminDesignationOptions = adminDesignation.map((item) => ({
  value: item,
  label: item,
}));

export const facultyDesignationOptions = facultyDesignation.map((item) => ({
  value: item,
  label: item,
}));