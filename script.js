
const button = document.querySelector("button");
const audioElement = document.querySelector("audio");


const toggleButton = () =>{
    button.disabled = !button.disabled
}
// Passing joke into the voiceRSS api
const tellMe = (joke) =>{
    VoiceRSS.speech({
        key: "7fbf03f0b21040c7a3e0d88a238875d2",
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });

}
// Get jokes from joke api
const getJokes = async() =>{
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try{
        const respone = await fetch(apiUrl)
        const data = await respone.json()
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke = data.joke;
        }
        tellMe(joke)
        toggleButton();
    }catch(error){
        console.log('Error in getting joke:', error)
    }
}

// Event listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)