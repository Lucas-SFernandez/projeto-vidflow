//Barra de pesquisa
const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

//Filtro de categorias
const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = filtro.toLowerCase();

    videos.forEach((video) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();

        video.style.display = !categoria.includes(valorFiltro) && valorFiltro != 'tudo' ? 'none' : 'block';
    });

}

//Buscando e mostrando os vídeos na tela
import axios from "./node_modules/axios";
const containerVideos = document.querySelector('.videos__container');

async function buscarMostrarVideos() {
    const urlVideos = import.meta.env.PROD ? 'https://gist.githubusercontent.com/Lucas-SFernandez/479dc93238bf0c322f20c8d509a3a818/raw/eaffe3aaddfaaf9e2f12ad5183d6a9bb2faee4ee/gistfile1.txt' : 'http://localhost:3000/videos'

    try {
        const buscar = await axios.get(urlVideos);
        const videos = buscar.data;
        
        
        videos.forEach((video) => {
            containerVideos.innerHTML += `
    <li class="videos__item">
    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
    
    <div class='descricao-video'>
    <img class='img-canal' src='${video.imagem} alt='Logo do canal'/>
    <h3 class='titulo-video'>${video.titulo}</h3>
    <p class='titulo-canal'>${video.descricao}</p>
    <p class='categoria' hidden>${video.categoria}</p>
    </div>
    </li>
    `;
        })
    } catch (err) {
        containerVideos.innerHTML = `<p style="color: red; font-size: 18px;"> Houve um erro ao carregar os vídeos; ${err} </br> Pro favor tente mais tarde</p>`;
    }
}

buscarMostrarVideos();
