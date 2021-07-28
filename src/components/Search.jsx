import React from 'react';
import { VoiceSearch } from '../utils/speechrecognition';

class Search extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      employeeName: '',
      voiceInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleVoiceRecorder = this.handleVoiceRecorder.bind(this);
  }

  handleChange (e) {
    this.setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    this.props.onSearch(e.target.value);
  }

  handleCreateUserClick = () => {
    this.props.handleCreateUser();
  }

  handleExportExcelClick = () => {
    this.props.handleExportExcel();
  }

  handleVoiceRecorder () {
    const vs = new VoiceSearch(this.props.employeesNames);
    vs.start();
    vs.onComplete((input) => {
      this.setState({ voiceInput: input });
    });
  }

  render () {
    return (
      <div className="d-flex align-items-center justify-content-center mb-4 search-box">
        <div className="input-group w-50">
          <span className="input-icon position-absolute" id="basic-addon1"><i className="fas fa-search"></i></span>
          <input onChange={this.handleChange} name='employeeName' value={this.state.voiceInput || this.state.employeeName} type="text" className="form-control position-relative" placeholder="Search" aria-label="employee-name" aria-describedby="basic-addon1"/>
          <span onClick={this.handleVoiceRecorder} className="input-icon position-absolute microphone"><i className="fas fa-microphone"></i></span>
        </div>
        <div onClick={this.handleCreateUserClick} className="ml-3 cursor-pointer"><i className="fas fa-user-plus"></i></div>
        <div onClick={this.handleExportExcelClick} className="ml-3 cursor-pointer"><i className="fas fa-file-excel"></i></div>
      </div>
    );
  }
}

export { Search };
