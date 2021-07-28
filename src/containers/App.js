import { connect } from 'react-redux';
import App from '../Pages/App';
import {
  setEmployeeList,
  editUser,
  deleteUser,
  setEmployeeDetails,
  setFilterListBySearchInput,
  addUser,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    employeesList: state.employeesDetailsList,
    editEmployeesDetails: state.employeeDetails,
    filteredEmployeesList: state.filteredList,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setFilterListBySearchInput: (payload) => dispatch(setFilterListBySearchInput(payload)),
  setEmployeeList: (payload) => dispatch(setEmployeeList(payload)),
  editUser: (payload) => dispatch(editUser(payload)),
  deleteUser: (payload) => dispatch(deleteUser(payload)),
  setEmployeeDetails: (payload) => dispatch(setEmployeeDetails(payload)),
  addUser: (payload) => dispatch(addUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);