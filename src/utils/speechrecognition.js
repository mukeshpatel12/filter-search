class VoiceSearch {
  constructor (employeesNames) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;    
    const grammar = '#JSGF V1.0; grammar names; public <name> = ' + employeesNames.join(' | ') + ' ;'

    this.recognition = new SpeechRecognition();

    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    this.recognition.grammars = speechRecognitionList;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }

  start () {
    this.recognition.start();
    console.log('Ready to receive command.');
  }

  onComplete (callback) {
    this.recognition.onresult = function (event) {
      console.log(event, 'inside complete')
      const name = event.results[0][0].transcript;
      console.log('Confidence: ' + event.results[0][0].confidence);

      callback(name);

      return name;
    }
  }

  stop () {
    console.log('Speech ended');
    this.recognition.onspeechend = function () {
      console.log('Speech ended');
      this.recognition.stop();
    }
  }

  noMatch () {
    console.log('no match');
    this.recognition.onnomatch = function (event) {
      console.log('no match', event);
      return { error: 'No match found' };
    }
  }

  onError () {
    console.log('Error');
    this.recognition.onerror = function(event) {
      console.log('Error', event);
      return { error: event.error };
    }
  }
}

export { VoiceSearch };