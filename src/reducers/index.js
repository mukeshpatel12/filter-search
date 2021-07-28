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
  RESET_EXPORT_EXCEL,
} from '../actions';
import { setEmployeeListToLocalStorage, getEmployeeListFromLocalStorage } from '../utils/helpers';

const initialState = {
  filteredList: [],
  employeesDetailsList: getEmployeeListFromLocalStorage() || [],
  type: null,
  employeeDetails: {},
  exported: false,
};

const insertElement = (state, element) => {
  const maxId = Math.max.apply(null, [...state.map(i => i.id)]);
  return [...state, { ...element, id: maxId + 1 }];
}

const findByIdAndDelete = (state, id) => {
  return state.filter(i => i.id !== id);
}

const findByIdAndUpdate = (state, id, updateQuery) => {
  return state.map((i) => {
    if (i.id === id) {
      return updateQuery;
    }
    return i;
  });
}

const filterListByText = (state, text) => {
  return state.filter((item) => item.name.toLowerCase().indexOf(text) > -1);
}

export function employees (state = initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEE_LIST:
      setEmployeeListToLocalStorage(action.payload);
      return {
        ...state,
        employeesDetailsList: action.payload,
      };
    case SET_FILTER_DATA:
      return {
        ...state,
        filteredList: filterListByText(state.employeesDetailsList, action.payload)
      };
    case RESET_FILTER_DATA:
      return {
        ...state,
        filteredList: []
      };
    case SET_FILTER_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case SET_EMPLOYEE_DETAILS:
      return {
        ...state,
        employeeDetails: {
          ...state.employeeDetails,
          ...action.payload,
        }
      };
    case ADD_USER: {
      const updatedList = insertElement(state.employeesDetailsList, action.payload);
      setEmployeeListToLocalStorage(updatedList);
      return {
        ...state,
        employeesDetailsList: updatedList
      };
    }
    case EDIT_USER: {
      const updatedList = findByIdAndUpdate(state.employeesDetailsList, action.payload.id, action.payload);
      setEmployeeListToLocalStorage(updatedList);
      return {
        ...state,
        employeesDetailsList: updatedList,
      };
    }
    case DELETE_USER: {
      const updatedList = findByIdAndDelete(state.employeesDetailsList, action.payload.id);
      setEmployeeListToLocalStorage(updatedList);
      return {
        ...state,
        employeesDetailsList: updatedList
      }
    }
    case EXPORT_EXCEL:
      return {
        ...state,
        exportExcel: true
      };
    case RESET_EXPORT_EXCEL:
      return {
        ...state,
        exportExcel: false,
      };
    default:
      return state;
  }
}