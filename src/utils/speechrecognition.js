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

    this.output = '';

    this.start = this.start.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.stop = this.stop.bind(this);
    this.noMatch = this.noMatch.bind(this);
    this.onError = this.onError.bind(this);
  }

  getVoiceSearchOutput() {
    return this.output;
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
      this.output = name;
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

  onSoundStart () {
    this.recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
    }
  }

  onSoundEnd () {
    this.recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
    }
  }

  onSpeechStart() {
    this.recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
    }
  }

  onStart() {
    this.recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
    }
  }
}

export { VoiceSearch };