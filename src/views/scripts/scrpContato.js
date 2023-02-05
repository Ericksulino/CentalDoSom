const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

let message = "";
let type = "";



form.addEventListener('submit',(event)=>{

  // se todos os dados estiverem corretos
    // dados a serem enviados
    const dados = {
      name: campos[0].value,
      email: campos[1].value,
      content_msg: campos[2].value,
    };
    console.log(dados);
    fetch('/msg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(res => {
      if (res.status === 201) {
        message = ("Messagem enviada com Sucesso!");
        type = "success";
        console.log(message);
        window.location.href = '/Home';

      } else if (res.status === 400 || 500) {
        message = ("ERRO ao enviar a Messagem!");
        type = "danger"
        console.log(message);
        spans[0].style.display = 'block';
        //window.location.href = '/CadUser';
      }
    })
  }
);
