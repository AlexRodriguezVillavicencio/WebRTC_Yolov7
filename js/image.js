"use strict";
(() => {
const inputImage = document.querySelector('#upload_image');

inputImage.addEventListener('change', (e)=>{

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
            const canvas = document.querySelector('#canvasImage');
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 560,400) // draw image in dashboard

        }
    }
})
})();
