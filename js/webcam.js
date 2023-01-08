'use strict';

const select = document.querySelector('#select_webcam_rstp')
select.style.width = "560px";
select.style.margin = "auto";

select.addEventListener('change' , function() {
if( this.value === 'webcam'){
     document.querySelector('#container__video1').style.display = 'block'
     document.querySelector('#container__video2').style.display = 'none'
}
if( this.value === 'urls_stp'){
     document.querySelector('#container__video1').style.display = 'none'
     document.querySelector('#container__video2').style.display = 'block'
}
});

const webcam_video = document.querySelector('#webcam__video')
webcam_video.style.transform = "scaleX(-1)";

function startWebcam() {

          navigator.mediaDevices.getUserMedia({video:{
               width: 560,
               height:400
          }})
          .then((stream) => {
            window.localStream = stream;
            webcam_video.srcObject = stream;
          })
          .catch((error) => {console.log(error)});

}


function stopWebcam() {

    localStream.getVideoTracks()[0].stop();
    webcam_video.src = '';

}
