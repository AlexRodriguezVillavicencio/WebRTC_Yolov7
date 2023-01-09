
salida_url = document.querySelector('#salida_url')
salida_url.disabled = true;

function handleValueChange(evento){ 
    const regex = /rtsp:[^v]/
      if (regex.test(evento.value)){
        document.querySelector('#validationurl').innerHTML = ""
        salida_url.disabled = false;
    }
    else{
        document.querySelector('#validationurl').innerHTML = "Ingrese una url correcta"
    } 
  }