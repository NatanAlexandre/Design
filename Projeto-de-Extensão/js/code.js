const apiKey = 'edde62da66c86b9efdd0e9c6f82196d1';
const urlImagem = 'https://image.tmdb.org/t/p/w500/';
const botaoConsultar = document.getElementById('pesquisar');

const setCreateCard = async function () {
  const divCards = document.getElementById('card');

  try {
    // Faz uma requisição à API para obter os filmes em destaque (ou de acordo com algum critério desejado)
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=edde62da66c86b9efdd0e9c6f82196d1');
    const data = await response.json();

    if (data.results.length > 0) {
      // Limpa o conteúdo existente dos cards
      divCards.innerHTML = '';

      // Itera sobre os filmes obtidos da API e cria os cards
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

        // Adiciona evento de clique ao card para mostrar o popup
        divCardPrincipal.addEventListener('click', function () {
          showMoviePopupFromCard(filme.id); // Passa o ID do filme para a função do popup
        });
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

  // Oculta o popup ao iniciar a busca
  document.getElementById('popup').style.display = 'none';
  document.getElementById('blackout').style.display = 'none';

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
  let blackout = document.getElementById('blackout');

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
  blackout.style.display = 'flex';

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
    blackout.style.display = 'none';
  });
};

const showMoviePopupFromCard = async function (movieId) {
  let popup = document.getElementById('popup');
  let blackout = document.getElementById('blackout');

  if (!popup) {
    console.error('Elemento de popup não encontrado.');
    return;
  }

  if (popup.style.display === 'flex') {
    console.log('O popup já está aberto.');
    return;
  }

  popup.style.display = 'flex';
  blackout.style.display = 'flex';

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movie = await response.json();

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

    let img = document.createElement('div');
    img.classList.add('popImg');
    img.style.backgroundImage = `url(${urlImagem}${movie.poster_path})`

    popup.innerHTML = '';

    popup.appendChild(img);
    popup.appendChild(info);
    info.appendChild(content);
    content.appendChild(titulo);
    content.appendChild(subtitle);
    container.appendChild(overview);
    content.appendChild(container);
    info.appendChild(button);

    button.addEventListener('click', function () {
      popup.style.display = 'none';
      blackout.style.display = 'none';
    });
  } catch {
    console.error('Erro ao obter dados do filme:', error);
    alert('Ocorreu um erro ao buscar dados do filme. Por favor, tente novamente.');
  }
};



// Adiciona evento de clique aos cards
document.querySelectorAll('.cardPrincipal').forEach(card => {
  card.addEventListener('click', function () {
    // Ao clicar no card, obtém o nome do filme do texto dentro do card
    let movieName = this.textContent.trim(); // Supondo que o nome do filme esteja diretamente no texto do card
    showMoviePopupFromCard(movieName);
  });
});






window.addEventListener('load', function () {
  setCreateCard();
  const botaoConsultar = document.getElementById('pesquisar'); // Seleciona o botão de pesquisa novamente
  if (botaoConsultar) {
    botaoConsultar.addEventListener('click', getDadosFilme);
  } else {
    console.error('Botão de pesquisa não encontrado.');
  }
});

