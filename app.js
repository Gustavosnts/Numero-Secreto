let listaDeNumerosSorteados = [];
let numeroLimiteInicial = 10; 
let numeroLimite = numeroLimiteInicial;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let palpites = [];

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Adivinhe o numero secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = parseInt(document.querySelector('.container__input').value); 

    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', `Digite um número entre 1 e ${numeroLimite}.`);
        return;
    }

    palpites.push(chute);
    document.getElementById('historico').innerText = `Números escolhidos: ${palpites.join(', ')}`;

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let dica = chute > numeroSecreto ? 'menor' : 'maior';
        exibirTextoNaTela('p', `O número secreto é ${dica}`);
        tentativas++;
    }

    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector('.container__input').value = ''; 
}

function reiniciarJogo() {
    numeroLimite = numeroLimiteInicial; 
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    palpites = [];
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('historico').innerText = '';
    limparCampo();
    document.querySelector('.container__input').setAttribute('max', numeroLimite);
    document.querySelector('.container__texto p').innerText = `Escolha um número entre 1 e ${numeroLimite}`;
}

function definirLimite() {
    let novoLimite = parseInt(document.getElementById('limiteInput').value);

    if (isNaN(novoLimite) || novoLimite < 1) {
        alert('Digite um número válido maior que 0.');
        return;
    }

    numeroLimite = novoLimite;
    numeroSecreto = gerarNumeroAleatorio();
    listaDeNumerosSorteados = [];
    tentativas = 1;
    palpites = [];
    exibirMensagemInicial();
    
    document.getElementById('historico').innerText = '';
    document.querySelector('.container__texto p').innerText = `Escolha um número entre 1 e ${numeroLimite}`;
    document.querySelector('.container__input').setAttribute('max', numeroLimite);
    
    limparCampo();
}