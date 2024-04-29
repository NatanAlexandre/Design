let urlImagem = 'https://image.tmdb.org/t/p/w500/';
const apiKey = 'edde62da66c86b9efdd0e9c6f82196d1';
const botaoConsultar = document.getElementById('pesquisar');

const setCreateCard = async function () {
  let divCards = document.getElementById('card');

  try {
    // Faz uma requisição à API para obter os filmes em destaque (ou de acordo com algum critério desejado)
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=edde62da66c86b9efdd0e9c6f82196d1');
    const data = await response.json();

    if (data.results.length > 0) {
      // Itera sobre os filmes obtidos da API
      data.results.forEach(filme => {
        let divCardPrincipal = document.createElement('div');
        divCardPrincipal.classList.add('cardPrincipal');

        let figureImg = document.createElement('figure');
        figureImg.classList.add('cardimage');

        let img = document.createElement('img');
        img.classList.add('imgCard');
        img.src = `${urlImagem}${filme.poster_path}`;

        let divTexto = document.createElement('div');
        divTexto.classList.add('textoCard');
        divTexto.textContent = filme.title;

        divCards.appendChild(divCardPrincipal);
        divCardPrincipal.appendChild(figureImg);
        figureImg.appendChild(img);
        divCardPrincipal.appendChild(divTexto);
      });
    } else {
      console.log('Nenhum filme encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter dados dos filmes:', error);
    alert('Ocorreu um erro ao buscar dados dos filmes. Por favor, tente novamente mais tarde.');
  }
};

const showMoviePopup = function (movie) {
  let popup = document.createElement('div');
  popup.classList.add('popup');

  let title = document.createElement('h2');
  title.textContent = movie.title;

  let overview = document.createElement('p');
  overview.textContent = movie.overview;

  let closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(title);
  popup.appendChild(overview);
  popup.appendChild(closeButton);

  document.body.appendChild(popup);
};

const getDadosFilme = async function (){
  let filme = document.getElementById('search').value;
  if (filme.value == ''){
    alert('Digite o filme a ser procurado');
    return
  } 

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(filme)}`);
    const data = await response.json();

    if (data.results.length > 0){
      const movie = data.results[0];
      showMoviePopup(movie);
    }
  }
  catch(error){
    alert('Erro ao obter dados do filme');
  }
}

window.addEventListener('load', function(){
  setCreateCard();
  botaoConsultar.addEventListener('click', getDadosFilme);
})
