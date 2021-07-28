import React, { Component } from 'react';
import { getEmployeesFields, getRequiredFieldNames } from '../utils/constants';

class Modal extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  }

  componentDidMount() {
    const { user } = this.props;
    const flatObject = { ...user };

    if (Object.keys(user).length > 0) {
      flatObject.suite = user.address.suite;
      flatObject.street = user.address.street;
      flatObject.city = user.address.city;
      flatObject.zipcode = user.address.zipcode;
      flatObject.lat = user.address.geo.lat;
      flatObject.lng = user.address.geo.lng;
      flatObject.companyName = user.company.name;
      flatObject.catchPhrase = user.company.catchPhrase;
      flatObject.bs = user.company.bs;

      delete flatObject.address;
      delete flatObject.company;
  
      this.setState((prev) => ({
        ...prev,
        ...flatObject,
      }));
    }
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;

    this.setState((pre) => ({
      ...pre,
      [id]: value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, email, phone, website, street, suite, zipcode, city, lat, lng, companyName, catchPhrase, bs } = this.state;

    const formattedObject = {
      name, username, email, phone, website,
      address: { street, suite, zipcode, city, geo: { lat, lng } },
      company: { name: companyName, catchPhrase, bs  },
    };

    if (this.props.type === 'create') {
      const valid = this.validateRequiredField();
      if (valid) {
        this.props.handleSubmit(this.props.type, formattedObject);
      } else {
        this.setState({ errors: 'Fill all required fields' });
      }
    } else {
      this.props.handleSubmit(this.props.type, formattedObject);
    }
  }

  validateRequiredField = () => {
    const requiredFields = getRequiredFieldNames();
    const stateKeys = Object.keys(this.state);
    const result = requiredFields.every(field => {
      if (stateKeys.includes(field) && this.state[field] && this.state[field].length > 0) {
        return true;
      }
      return false;
    });

    return result;
  }

  render() {
    const inputs = getEmployeesFields();
    const requiredFields = getRequiredFieldNames();

    if (this.props.isOpen) {
      return (
        <>
          <div style={{ display: this.props.isOpen ? 'block' : 'none' }} className={`modal overflow-auto ${this.props.isOpen ? 'show' : 'hide'}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ padding: "35px 50px" }}>
                  <h4>Edit User</h4>
                </div>
                <div className="modal-body" style={{ padding: '40px 50px' }}>
                  <form onSubmit={this.handleSubmit}>
                    {inputs.map((i, idx) => (
                      <div key={idx} className="form-group">
                        <label className="text-capitalize" htmlFor={i}>
                          {i}
                          {(this.props.type === 'create' && requiredFields.includes(i)) && (
                            <span className="text-danger">&nbsp;required*</span>
                          )}
                        </label>
                        <input value={this.state[i]} onChange={this.handleInputChange} type="text" className="form-control" id={i} />
                      </div>
                    ))}
                    {this.state.errors && (
                      <p className="text-center text-danger">{this.state.errors}</p>
                    )}
                    <button type="submit" className="btn btn-success btn-block">Update</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button onClick={this.props.closeModal} type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className='backdrop' />
        </>
      );
    }

    return null;
  }
}

export { Modal };
