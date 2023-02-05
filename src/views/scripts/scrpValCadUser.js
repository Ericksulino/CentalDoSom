const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^\w+([-+.']w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

let message = "";
let type = "";



form.addEventListener('submit',(event)=>{
  spans[6].style.display = 'none';
  event.preventDefault();
  nameValidate();
  emailValidate();
  telValidate();
  mainPasswValidate();
  comparePassw();
  termos();

  let isValid = true;
  for (let i = 0; i < campos.length; i++) {
    if (campos[i].style.border == '2px solid #e63636') {
      isValid = false;
      break;
    }
  }

  // se todos os dados estiverem corretos
  if (isValid) {
    // dados a serem enviados
    const dados = {
      name: campos[0].value,
      email: campos[1].value,
      number: campos[2].value,
      password: campos[3].value
    };
    console.log(dados);
    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(res => {
      if (res.status === 201) {
        message = ("Usuário Criado com Sucesso!");
        type = "success";
        console.log(message);
        window.location.href = '/Home';

      } else if (res.status === 400 || 500) {
        message = ("ERRO ao Criar o Usuário!");
        type = "danger"
        console.log(message);
        spans[6].style.display = 'block';
        //window.location.href = '/CadUser';
      }
    })
  }
});



function setError(index){
  campos[index].style.border = '2px solid #e63636';
  spans[index].style.display = 'block';
}

function removError(index){
  campos[index].style.border = '';
  spans[index].style.display = 'none';
}

function nameValidate(){
  if (campos[0].value.length < 5){
    setError(0);
  }
  else{
    removError(0);
  }
}

function emailValidate(){
  if (emailRegex.test(campos[1].value)){
    removError(1);
  }
  else{
    setError(1);
  }
}

function telValidate(){
  if (campos[2].value.length < 11){
    setError(2);
  }
  else{
    removError(2);
  }
}

function mainPasswValidate(){
  if (campos[3].value.length < 8){
    setError(3);
  }
  else{
    removError(3);
    comparePassw();
  }
}

function comparePassw(){
  if(campos[3].value == campos[4].value && campos[4].value.length>=8){
    removError(4);
  }
  else{
    setError(4);
  }
}

function termos(){
  if (campos[5].checked){
    removError(5);
  }
  else{
    setError(5);
  }
}
