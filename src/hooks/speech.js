import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function useVoiceSearch ({ commands }) {
  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition({ commands });

  let speechSupported = false;
  if (SpeechRecognition.browserSupportsSpeechRecognition) {
    speechSupported = true;
  }

  return { SpeechRecognition, transcript, interimTranscript, finalTranscript, resetTranscript, listening, speechSupported };
}

export { useVoiceSearch };
