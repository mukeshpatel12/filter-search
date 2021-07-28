import React, { useEffect, useState } from 'react';
import { useVoiceSearch } from '../hooks/speech';
// import { VoiceSearch } from '../utils/speechrecognition';

function Search (props) {
  const generateGrammerCommands = () => {
    return [
      { command: 'hello', callback: () => console.log('Just said hello'), matchInterim: true, },
      { command: '*', callback: (name) => setVoiceOutput(name) },
      { command: 'clear', callback: () => clearText() },
    ]
  }

  const [employeeName, setEmployeeName] = useState('');
  const [voiceOutput, setVoiceOutput] = useState('');
  const [isListening, setListening] = useState(false);
  const { SpeechRecognition, interimTranscript, finalTranscript, speechSupported, resetTranscript } = useVoiceSearch({ commands: generateGrammerCommands() });

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }

    if (voiceOutput !== '') {
      props.onSearch(voiceOutput);
    }
  }, [interimTranscript, finalTranscript, voiceOutput]);

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

  const clearText = () => {
    resetTranscript();
    setVoiceOutput('');
  }

  const handleStopRecording = () => {
    setListening(false);
    clearText();
    SpeechRecognition.stopListening();
  }

  const handleVoiceRecorder = () => {
    if (isListening) {
      handleStopRecording();
    } else {
      setListening(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-GB',
      });
    }
  }

  console.log('Voice->>>>', voiceOutput);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mb-4 search-box">
        <div className="input-group w-50">
          <span className="input-icon position-absolute" id="basic-addon1"><i className="fas fa-search"></i></span>
          <input onChange={handleChange} name='employeeName' value={voiceOutput || employeeName} type="text" className="form-control position-relative" placeholder="Search" aria-label="employee-name" aria-describedby="basic-addon1"/>
          <span onClick={handleVoiceRecorder} className="cursor-pointer input-icon position-absolute microphone">
            <i className={`fas ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          </span>
        </div>
        <div onClick={handleCreateUserClick} className="ml-3 cursor-pointer"><i className="fas fa-user-plus"></i></div>
        <div onClick={handleExportExcelClick} className="ml-3 cursor-pointer"><i className="fas fa-file-excel"></i></div>
      </div>
      {isListening && !speechSupported && (
        <div className="text-danger">
          Browser is not Support Speech Recognition.
        </div>
      )}
    </>
  );
}

export { Search };
