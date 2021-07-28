import {
  SET_EMPLOYEE_LIST,
  SET_FILTER_DATA,
  RESET_FILTER_DATA,
  SET_FILTER_TYPE,
  SET_EMPLOYEE_DETAILS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  EXPORT_EXCEL,
} from './constants';

export const setEmployeeList = (payload) => ({ type: SET_EMPLOYEE_LIST, payload });
export const setFilterListBySearchInput = (payload) => ({ type: SET_FILTER_DATA, payload });
export const resetFilterData = () => ({ type: RESET_FILTER_DATA });
export const setFilterType = (payload) => ({ type: SET_FILTER_TYPE, payload });
export const setEmployeeDetails = (payload) => ({ type: SET_EMPLOYEE_DETAILS, payload });
export const addUser = (payload) => ({ type: ADD_USER, payload });
export const editUser = (payload) => ({ type: EDIT_USER, payload });
export const deleteUser = (payload) => ({ type: DELETE_USER, payload });
export const exportExcel = (payload) => ({ type: EXPORT_EXCEL, payload });
