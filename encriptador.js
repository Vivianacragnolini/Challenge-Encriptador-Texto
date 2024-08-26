const textArea = document.querySelector( ".escrito" );
const mensaje = document.querySelector( ".dupli" );
const copia = document.querySelector( ".btn-copiar" );
const enc = document.querySelector( ".btn-encriptar" );
const des = document.querySelector( ".btn-desencriptar" );
enc.addEventListener( "click", btnEncriptar );
des.addEventListener( "click", btnDesencriptar );
copia.addEventListener( "click", btnCopiar );  
let matrizCodigo = [[ "e", "enter" ], [ "i", "imes" ], [ "a", "ai" ], [ "o", "ober" ], [ "u", "ufat" ], [ " ", "." ], [ "\n", "..." ]];
function validarTexto() {
  let textoEscrito = document.querySelector(".escrito").value;
  let regex = /^[a-zñ\s\n]+$/;
  let esValido = regex.test(textoEscrito);
  if (!esValido) {
    alert("Solo son permitidas letras minúsculas y sin acentos");
    location.reload();
    return false;
  }
}
function btnEncriptar() {
  if( ! validarTexto() ) {
      const textoEncriptado = encriptar( textArea.value );
      mensaje.value = textoEncriptado;
      mensaje.style.backgroundImage = "none";
      textArea.value = "";
      copia.style.display = "inline-block" ;   
      document.getElementById('btn-desencriptar').disabled = false;
      document.getElementById('btn-copiar').disabled = false;
  }
}
function encriptar( textoParaEncriptar ) {  
  let newStringEncriptada = textoParaEncriptar.toLowerCase();   
  for( let i = 0; i < matrizCodigo.length; i++ ) {
      if( newStringEncriptada.includes( matrizCodigo[i][0] )) {
          newStringEncriptada = newStringEncriptada.replaceAll( matrizCodigo[i][0], matrizCodigo[i][1] );
      }
  }
  return newStringEncriptada;
}
function btnDesencriptar(){  
  const textoOriginal = desencriptar( textArea.value );
  mensaje.value = textoOriginal;
  textArea.value = "";    
}
function desencriptar( stringEncriptada ) { 
  let newStringDesencriptada  = stringEncriptada.toLowerCase();
  for( let i = 0; i < matrizCodigo.length; i++ ) {
      if( newStringDesencriptada.includes( matrizCodigo[i][1] )) {
          newStringDesencriptada = newStringDesencriptada.replaceAll( matrizCodigo[i][1] , matrizCodigo[i][0] );
      }
  }
  document.getElementById('btn-desencriptar').disabled = true;
  document.getElementById('btn-copiar').disabled = false;
  return newStringDesencriptada;
}
function btnCopiar(){
  mensaje.select();
  navigator.clipboard.writeText(mensaje.value);
  mensaje.value = "";
  document.getElementById('btn-copiar').disabled = true;
  alert("Texto Copiado");
}
function adjustHeight() {
      textArea.style.height = 'auto'; 
      textArea.style.height = `${textArea.scrollHeight}px`;
      mensaje.style.height = 'auto'; 
      mensaje.style.height = `${textArea.scrollHeight}px`; 
}
textArea.addEventListener('input', adjustHeight);
mensaje.addEventListener('input', adjustHeight);
adjustHeight();