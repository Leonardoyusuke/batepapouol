let chat = [];
let dados;
const buscarChat = []
type = []
let time;
let from;
let to;
let text;
let usuario




novoUsuario()
// pegar o nome do participante
const promessaParticipantes = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants"); //pergar participantes
promessaParticipantes.then(respostaChegou);
promessaParticipantes.catch(respostaNaoChegou);

function respostaChegou(respostaParticipantes){
console.log(respostaParticipantes.data)
participantes = respostaParticipantes.data;
}

function respostaNaoChegou(erro){
    console.log("Status code: " + erro.response.status);
	console.log("Mensagem de erro: " + erro.response.data);
}

//ADD PARTICIPANTES 

function novoUsuario(){
usuario = prompt("qual seu nome?");
dados = {
    name:`${usuario}`
}
const enviarNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",dados)
enviarNome.then(nomeCerto);
enviarNome.catch(nomeErrado)
}
function nomeCerto(resposta) {
    console.log(resposta.stats)
    alert("Bem vindo!")
}

function nomeErrado(erro) {
    console.log(erro);
    let usuario = prompt("Nome em uso!");
    dados = {
        name:`${usuario}`
    }
    const enviarNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",dados)
    enviarNome.then(nomeCerto);
    enviarNome.catch(nomeErrado)

}

//Manter conexão
setInterval(checarPresenca, 5000);
function checarPresenca(){
    alert("continua ai?")
    const continuaOnline = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",dados )
    continuaOnline.then(continuaOnlineSim);
    continuaOnline.catch(continuaOnlineNao);

function continuaOnlineSim (){
    console.log("continua online")}
function continuaOnlineNao (){
    console.log("nao esta online")
}
}


// buscar msg antigas
carregarChat()
function carregarChat(){
    const buscarChat = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscarChat.then(carregarMSG);
    buscarChat.catch(erroChat);
}
function carregarMSG(res){
    console.log(res.data)
    renderizarChat(res)
}
function erroChat(){
    console.log("erro chat")
}

// renderizar chat 

function renderizarChat(res){
    let rendChat = document.querySelector(".mensagem")
    console.log(res)
    rendChat.innerHTML=0
    res.data.map((r)=>{
        if(r.type == "status"){
            rendChat.innerHTML +=`
            <li class="status"> 
                <p class="p">(${r.time})</p> <p class="negrito">${r.from}</p> <p class="p">${r.text}</p> 
            </li>`
        }
        else if (r.type == "message"){
            rendChat.innerHTML +=`
            <li class="message"> 
                <p class="p">(${r.time})</p> <p class="negrito">${r.from}</p> <p class="p">para todos  ${r.text}</p> 
            </li>`
        }
        else if (r.to == usuario || r.from == usuario){
            rendChat.innerHTML +=`
            <li class="reservado">
                <p class="p">(${r.time})</p> <p class="negrito">${r.from}</p> <p class="p"> reservadamente para</p> <p class="negrito">${r.to}</p>  ${r.text}</p> 
            </li>`
        }
        else {}
    })
    setInterval(carregarChat,3000)
}

//scroll
setInterval(scroll,1000)
function scroll(){
    const elementoQueQueroQueApareca = document.querySelector('.invisivel');
    elementoQueQueroQueApareca.scrollIntoView();
}
    
// enviar msg
function enviarMsg(){
    const enviar = document.querySelector("input")
    const textoEnviar = enviar.value;

    let msg ={ 
        from: `${usuario}`,
	to: "Todos",
	text: `${textoEnviar}`,
    type: "message"}

    const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",msg);
    enviarMensagem.then(mensagemEnviada);
    enviarMensagem.catch(mensagemNaoEnviada);
}

function mensagemEnviada (){

}
function mensagemNaoEnviada(){
    console.log("errado")
}