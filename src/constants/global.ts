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

export const designation = ["Admin", "Moderator"];

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

export const designationOptions = designation.map((item) => ({
  value: item,
  label: item,
}));
