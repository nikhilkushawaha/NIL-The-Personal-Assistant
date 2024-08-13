const button = document.querySelector("button");
const texts = document.querySelector(".spokenWords");
var images = document.getElementById("buttonImg");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

const grammar = '#JSGF V1.0';

const recognition = new SpeechRecognition();
const speechRecognitionGrammarList = new SpeechGrammarList();

speechRecognitionGrammarList.addFromString(grammar,1);

recognition.grammars = speechRecognitionGrammarList;
recognition.lang = 'en-US';

    
recognition.onstart = function() {
    console.log("I am Listenning...");

    document.querySelector('button').style.background = "red";

    setInterval( () => {
        document.querySelector('button').style.background = "rgba(84, 155, 210, 0.596)";
    },10000);

};

let p = document.createElement('p');

recognition.onresult = (event) => {
    console.log(event);
    

    const spokenwords = event.results[0][0].transcript;
    console.log("Do you mean: ",spokenwords);
    botSpeech(spokenwords);

    p.innerText = spokenwords;
    texts.appendChild(p);
    console.log(spokenwords);

};

function botSpeech(words){
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.volume = 1;
    speech.rate = 1;

    replyBack(speech,words);

    window.speechSynthesis.speak(speech);
};


function replyBack(speech,words){
    if(words.includes("Hi")){
        speech.text = "Hello sir! what can I do for you"
    }
    else if(words.includes("How are you")){
        speech.text = "I am fine sir!, thanku for asking"
    }
    else if(words.includes("How is your health?")){
        speech.text = "first class sir!"
    }
    else if(words.includes("Who are you") || words.includes("What is your name")){
        speech.text = "I am NIL"
    }
    else if(words.includes("Do you know me?") || words.includes("What is my name")){
        speech.text = "You are mister Nikhil Kushawaha"
    }
    else if(words.includes('Time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        speech.text = "The time is"+ time;
    }
    else if(words.includes("Open Google")){
        speech.text = "opening google";
        window.open("https://www.google.com/");
    }
    else if(words.includes("Open YouTube")){
        speech.text = "opening YouTube";
        window.open("https://www.youtube.com/");
    }
    else{
        window.open(`https://www.google.com/search?q=${words.replace(" ", "+")}`, "_blank");
        speech.text = "I found something on google";
    };
};

button.addEventListener("click", ()=> {
    recognition.start();

});

