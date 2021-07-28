import React, { useEffect, useState } from 'react';
import { useVoiceSearch } from '../hooks/speech';
// import { VoiceSearch } from '../utils/speechrecognition';

function Search (props) {
  const generateGrammerCommands = () => {
    return props.employeesNames.reduce((prev, c) => {
      const obj = {};

      obj.command = c;
      obj.callback = () => setVoiceOutput('Listening...');

      return [...prev, obj];
    }, []);
  }

  const [employeeName, setEmployeeName] = useState('');
  const [voiceOutput, setVoiceOutput] = useState('');
  const { SpeechRecognition, transcript, interimTranscript, finalTranscript, resetTranscript, listening, } = useVoiceSearch({ commands: generateGrammerCommands() });

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
      setVoiceOutput(transcript);
    }
  }, [interimTranscript, finalTranscript, transcript]);

  const handleChange = (e) => {
    setEmployeeName((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    props.onSearch(e.target.value);
  }

  const handleCreateUserClick = () => {
    props.handleCreateUser();
  }

  const handleExportExcelClick = () => {
    props.handleExportExcel();
  }

  const handleVoiceRecorder = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  }

  return (
    <div className="d-flex align-items-center justify-content-center mb-4 search-box">
      <div className="input-group w-50">
        <span className="input-icon position-absolute" id="basic-addon1"><i className="fas fa-search"></i></span>
        <input onChange={handleChange} name='employeeName' value={voiceOutput || employeeName} type="text" className="form-control position-relative" placeholder="Search" aria-label="employee-name" aria-describedby="basic-addon1"/>
        <span onClick={handleVoiceRecorder} className="input-icon position-absolute microphone"><i className="fas fa-microphone"></i></span>
      </div>
      <div onClick={handleCreateUserClick} className="ml-3 cursor-pointer"><i className="fas fa-user-plus"></i></div>
      <div onClick={handleExportExcelClick} className="ml-3 cursor-pointer"><i className="fas fa-file-excel"></i></div>
    </div>
  );
}

export { Search };
