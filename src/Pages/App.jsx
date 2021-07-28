import React from 'react';
import { Search, Datatable, Modal } from '../components';
import { getEmployeesListFromJson } from '../services';
import { exportToXlsx, getFlatObject, getObjectValueByStringChain } from '../utils/helpers';
import { getEmployeesFields } from '../utils/constants';

export default class App extends React.Component {
  state = {
    showModal: false,
    editUserDetails: {},
    type: '',
  }

  async componentDidMount() {
    const { employeesList } = this.props;

    if (employeesList && employeesList.length === 0) {
      const data = await getEmployeesListFromJson();
      this.props.setEmployeeList(data);
    }
  }

  editUser = (id) => {
    const { employeesList } = this.props;
    const found = employeesList.find(i => i.id === id);
    if (found) {
      this.setState((pr) => ({ ...pr, editUserDetails: found, showModal: true, type: 'edit' }));
    }
  }

  handleModalClose = () => {
    this.setState({ showModal: false, editUserDetails: {} });
  }

  handleUpdateEmployeeList = (type, id) => {
    switch (type) {
      case 'edit':
        this.editUser(id);
        break;
      case 'delete':
        this.props.deleteUser({ id });
        break;
      default:
        return;
    }
  }

  handleUpdateEmployeeDetails = (type, details = {}) => {
    switch(type) {
      case 'edit':
        this.setState({ showModal: false });
        this.props.editUser({ ...details });
        break;
      case 'create':
        this.setState({ showModal: false });
        this.props.addUser({ ...details });
        break;
      default:
        return;
    }
  }

  handleExportExcel = () => {
    const filename = 'Employees-list';
    const { data, headers } = this.getFormattedDataForExport();
    exportToXlsx(filename, data, headers);
  }

  getFormattedDataForExport = () => {
    const { employeesList } = this.props;

    const updated = employeesList.map((i) => {
      const obj = getFlatObject(i);
      delete obj.id;

      return obj;
    });

    return { data: updated, headers: Object.keys(updated[0]) };
  }

  render () {
    let tableData = [];
    if (this.props.filteredEmployeesList.length > 0) {
      tableData = this.props.filteredEmployeesList;
    } else {
      tableData = this.props.employeesList;
    }

    const sorted = tableData.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    const employeesNames = sorted.map(i => i.name.toLowerCase());

    return (
      <div className="container">
		    <div className="row">
          <div className="col-sm-10 mx-auto mt-4">
            <Search
              employeesNames={employeesNames}
              handleExportExcel={this.handleExportExcel}
              handleCreateUser={() => { this.setState({ type: 'create', showModal: true }) }}
              onSearch={this.props.setFilterListBySearchInput}
            />
            <Datatable
              data={sorted}
              handleUpdateEmployeeList={this.handleUpdateEmployeeList}
            />
            {this.state.showModal && (
              <Modal
                handleSubmit={this.handleUpdateEmployeeDetails}
                type={this.state.type}
                user={this.state.editUserDetails}
                isOpen={this.state.showModal}
                closeModal={this.handleModalClose}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
