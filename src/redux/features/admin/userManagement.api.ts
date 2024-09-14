import {
  TAdmin,
  TFaculty,
  TQueryParams,
  TResponseRedux,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleStudent: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateSingleStudent: builder.mutation({
      query: ({ data, id }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    blockStudent: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (id) => {
        return {
          url: `/admins/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateSingleAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admins/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (id) => {
        return {
          url: `/faculties/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateSingleFaculty: builder.mutation({
      query: ({ data, id }) => ({
        url: `/faculties/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "DELETE",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useBlockStudentMutation,
  useUpdateSingleStudentMutation,
  useDeleteStudentMutation,
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
  useDeleteAdminMutation,
  useAddFacultyMutation,
  useGetAllFacultiesQuery,
  useGetSingleFacultyQuery,
  useUpdateSingleFacultyMutation,
  useDeleteFacultyMutation,useChangePasswordMutation
} = userManagementApi;
