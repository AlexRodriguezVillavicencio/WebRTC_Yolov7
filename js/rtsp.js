"use strict";

// session
var SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
var STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
var session;
// var stream;
var PRELOADER_URL = "https://github.com/flashphoner/flashphoner_client/raw/wcs_api-2.0/examples/demo/dependencies/media/preloader.mp4";
 
//Init Flashphoner API on page load
function init_api() {
    Flashphoner.init({});
    //Connect to WCS server over websockets
    session = Flashphoner.createSession({
        urlServer: "wss://demo.flashphoner.com" //specify the address of your WCS
    }).on(SESSION_STATUS.ESTABLISHED, function(session) {
        console.log("ESTABLISHED");
        document.querySelector('#text_conectedRTSP').innerHTML = "Conectado!"
        console.log(session)
    });
 
    playBtnRTSP.onclick = playClick;
}

 
//Detect browser
var Browser = {
    isSafari: function() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },
}
/**
*
If browser is Safari, we launch the preloader before playing the stream.
Playback should start strictly upon a user's gesture (i.e. button click). This is limitation of mobile Safari browsers.
https://docs.flashphoner.com/display/WEBSDK2EN/Video+playback+on+mobile+devices
*
**/
function playClick() {
    if (Browser.isSafari()) {
        Flashphoner.playFirstVideo(document.getElementById("play"), true, PRELOADER_URL).then(function() {
            startRTSP();
        });
    } else {
        startRTSP();
    }
}

document.querySelector('#salida_url').addEventListener('click', () => {
    var entrada = document.querySelector('#entrada_url').value
    document.querySelector('.container__video2__child1').style.display = "none";
    document.querySelector('.container__video2__child2').style.display = "block";
    window.globalVariableURLrtsp = entrada;
    init_api();
    document.querySelector('#entrada_url').value ="";
})



function stopRTSP(){
    document.querySelector('#text_conectedRTSP').innerHTML = "Desconectando..."
    setTimeout(()=>{
        document.querySelector('.container__video2__child1').style.display = "block";
        document.querySelector('.container__video2__child2').style.display = "none";
        document.querySelector('#entrada_url').value ="";
        playBtnRTSP.disabled = false;
    },2000)
}
 
//Playing stream
function startRTSP(){
    session.createStream({
        name: window.globalVariableURLrtsp, //specify the RTSP stream address
        // name: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
        display: document.getElementById("play"),
    }).play();
    playBtnRTSP.disabled = true;
}

