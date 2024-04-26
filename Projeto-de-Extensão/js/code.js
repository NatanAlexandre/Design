let urlImagem = 'https://image.tmdb.org/t/p/w500/';

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

window.addEventListener('load', function () {
  setCreateCard();
});
