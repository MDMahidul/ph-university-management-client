import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParams,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // check if there is any arguments change the url params
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      // to get specific data from the response
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getsingleAcademicSemester: builder.query({
      query: (id) => {
        return {
          url: `/academic-semesters/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateSingleAcademicSemester: builder.mutation({
      query: ({ data, id }) => ({
        url: `/academic-semesters/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllAcademicFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      }, // to get specific data from the response
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getsingleAcademicFaculty: builder.query({
      query: (id) => {
        return {
          url: `/academic-faculties/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateSingleAcademicFaculty: builder.mutation({
      query: ({ data, id }) => ({
        url: `/academic-faculties/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    getsingleAcademicDepartment: builder.query({
      query: (id) => {
        return {
          url: `/academic-departments/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment>) => {
        return {
          data: response.data,
        };
      },
    }),
    updateSingleAcademicDepartment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/academic-departments/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemesterQuery,
  useAddAcademicSemesterMutation,useGetsingleAcademicSemesterQuery,useUpdateSingleAcademicSemesterMutation,
  useGetAllAcademicFacultiesQuery,
  useAddAcademicFacultyMutation,useGetsingleAcademicFacultyQuery,useUpdateSingleAcademicFacultyMutation,
  useAddAcademicDepartmentMutation,
  useGetAllDepartmentQuery,
  useGetsingleAcademicDepartmentQuery,
  useUpdateSingleAcademicDepartmentMutation,
} = academicManagementApi;
