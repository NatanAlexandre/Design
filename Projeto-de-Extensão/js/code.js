const apiKey = 'edde62da66c86b9efdd0e9c6f82196d1';
const urlImagem = 'https://image.tmdb.org/t/p/w500/';
const botaoConsultar = document.getElementById('pesquisar');

const setCreateCard = async function () {
  try {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=edde62da66c86b9efdd0e9c6f82196d1');
    const data = await response.json();

    if (data.results.length > 0) {
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

        divCardPrincipal.appendChild(figureImg);
        figureImg.appendChild(img);
        divCardPrincipal.appendChild(divTexto);

        document.getElementById('card').appendChild(divCardPrincipal);
      });
    } else {
      alert('Nenhum filme encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter dados dos filmes:', error);
    alert('Ocorreu um erro ao buscar dados dos filmes. Por favor, tente novamente mais tarde.');
  }
};

const getDadosFilme = async function () {
  let filme = document.getElementById('search').value;
  if (!filme) {
    alert('Digite o nome do filme a ser procurado');
    return;
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(filme)}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do filme');
    }
    const data = await response.json();

    if (data.results.length > 0) {
      const movie = data.results[0];
      showMoviePopup(movie);
    } else {
      alert('Nenhum filme encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter dados do filme:', error);
    alert('Ocorreu um erro ao buscar dados do filme. Por favor, tente novamente.');
  }
};

const showMoviePopup = function (movie) {
  let popup = document.getElementById('popup');
  if (!popup) {
    console.error('Elemento de popup não encontrado.');
    return;
  }

  // Verifica se o popup já está aberto
  if (popup.style.display === 'flex') {
    console.log('O popup já está aberto.');
    return;
  }

  popup.style.display = 'flex';

  // Criação do elemento de imagem
  let popImg = document.createElement('div');
  popImg.classList.add('popImg');
  popImg.style.backgroundImage = `url(${urlImagem}${movie.poster_path})`;

  let info = document.createElement('div');
  info.classList.add('info');

  let content = document.createElement('div');
  content.classList.add('content');

  let titulo = document.createElement('div');
  titulo.classList.add('title');
  titulo.textContent = movie.title;

  let subtitle = document.createElement('div');
  subtitle.classList.add('subtitle');
  subtitle.textContent = 'Sinopse:';

  let overview = document.createElement('div');
  overview.classList.add('overview');
  overview.textContent = movie.overview;

  let container = document.createElement('div');
  container.classList.add('container');

  let button = document.createElement('button');
  button.textContent = 'Fechar';
  button.classList.add('close');

  popup.innerHTML = ''; // Limpa o conteúdo existente do popup

  popup.appendChild(popImg);
  popup.appendChild(info);
  info.appendChild(content);
  content.appendChild(titulo);
  content.appendChild(subtitle);
  container.appendChild(overview);
  content.appendChild(container);
  info.appendChild(button);

  button.addEventListener('click', function () {
    popup.style.display = 'none'; // Fecha o popup ao clicar no botão Fechar
  });
};



window.addEventListener('load', function () {
  setCreateCard();
  const botaoConsultar = document.getElementById('pesquisar'); // Seleciona o botão de pesquisa novamente
  if (botaoConsultar) {
    botaoConsultar.addEventListener('click', getDadosFilme);
  } else {
    console.error('Botão de pesquisa não encontrado.');
  }
});

