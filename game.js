document.addEventListener('DOMContentLoaded', () => {

  function showModal({ title, text, icon }) {
    return Swal.fire({
      title,
      text,
      icon,
      background: '#16161d',
      color: '#eaeaf0',
      confirmButtonColor: '#5865f2'
    });
  }

  const $ = id => document.getElementById(id);

  const screens = {
    setup: $('setup'),
    words: $('words'),
    round: $('round'),
    voting: $('voting')
  };

  const playersInput = $('playersInput');
  const timeInput = $('timeInput');
  const startBtn = $('startBtn');
  const playersNamesContainer = $('playersNames');
  const categorySelect = $('categorySelect');

  const playerTitle = $('playerTitle');
  const card = $('card');
  const cardBack = $('cardBack');
  const nextBtn = $('nextBtn');

  const timerEl = $('timer');
  const goVoteBtn = $('goVoteBtn');
  const votesEl = $('votes');
  const finishVoteBtn = $('finishVoteBtn');

  let players = [];
  let secretWord = '';
  let impostorIndex = 0;
  let currentPlayerIndex = 0;
  let time = 60;
  let interval = null;
  let selectedVote = null;

  const categories = {
    argentina: [
      'Asado','Mate','Fernet','Empanada','Milanesa','Choripán',
      'Dulce de leche','Facturas','Boliche','Bondi','Subte',
      'Cancha','Tribuna','Parrilla','Quilombo','Laburo',
      'Guita','Birra','Remís','Vereda','Baldosa','Obelisco',
      'Plaza','Heladería','Kiosco','Panadería','Mercado',
      'Colectivo','Pizzería','Estadio'
    ],
    famosos: [
      'Messi','Maradona','Susana Giménez','Mirtha Legrand',
      'Tinelli','Ricardo Darín','Guillermo Francella',
      'Lali','Wanda Nara','Charly García','Pampita'
    ],
    cantantes: [
      'Duki','Nicki Nicole','Trueno','Bizarrap',
      'Cerati','Spinetta','Fito Páez','Wos','Tini'
    ],
    futbol: [
      'Messi','Maradona','Riquelme','Di María',
      'Mbappé','Cristiano Ronaldo','Neymar','Haaland'
    ]
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[name].classList.remove('hidden');
  }

  function generateNameInputs(count) {
    playersNamesContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const input = document.createElement('input');
      input.placeholder = `Nombre del jugador ${i + 1}`;
      playersNamesContainer.appendChild(input);
    }
  }

  playersInput.addEventListener('change', () => {
    generateNameInputs(+playersInput.value);
  });

  startBtn.addEventListener('click', () => {
    const count = +playersInput.value;
    time = +timeInput.value;

    const selectedCategory = categorySelect.value;
    const words = categories[selectedCategory];
    secretWord = words[Math.floor(Math.random() * words.length)];

    impostorIndex = Math.floor(Math.random() * count);
    currentPlayerIndex = 0;
    players = [];

    const nameInputs = playersNamesContainer.querySelectorAll('input');

    for (let i = 0; i < count; i++) {
      players.push({
        name: nameInputs[i].value || `Jugador ${i + 1}`,
        role: i === impostorIndex ? 'impostor' : 'player'
      });
    }

    updatePlayer();
    showScreen('words');
  });

  card.addEventListener('click', () => {
    card.classList.toggle('show');
    cardBack.textContent =
      players[currentPlayerIndex].role === 'impostor'
        ? 'IMPOSTOR'
        : secretWord;
  });

  function updatePlayer() {
    playerTitle.textContent = `Turno de ${players[currentPlayerIndex].name}`;
    card.classList.remove('show');
  }

  nextBtn.addEventListener('click', () => {
    currentPlayerIndex++;
    if (currentPlayerIndex >= players.length) {
      startRound();
    } else {
      updatePlayer();
    }
  });

  function startRound() {
    showScreen('round');
    timerEl.textContent = time;

    interval = setInterval(() => {
      time--;
      timerEl.textContent = time;
      if (time <= 0) {
        clearInterval(interval);
        startVoting();
      }
    }, 1000);
  }

  goVoteBtn.addEventListener('click', () => {
    clearInterval(interval);
    startVoting();
  });

  function startVoting() {
    showScreen('voting');
    votesEl.innerHTML = '';
    selectedVote = null;

    players.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'vote-player';
      div.textContent = p.name;
      div.onclick = () => {
        selectedVote = i;
        document.querySelectorAll('.vote-player')
          .forEach(el => el.classList.remove('selected'));
        div.classList.add('selected');
      };
      votesEl.appendChild(div);
    });
  }

  finishVoteBtn.addEventListener('click', async () => {
    if (selectedVote === null) {
      await showModal({
        title: 'Atención',
        text: 'Tenés que elegir a alguien',
        icon: 'warning'
      });
      return;
    }

    const eliminated = players[selectedVote];
    players.splice(selectedVote, 1);

    if (eliminated.role === 'impostor') {
      await showModal({
        title: '🎉 Impostor descubierto',
        text: `${eliminated.name} era el impostor`,
        icon: 'success'
      });
      location.reload();
      return;
    }

    await showModal({
      title: '❌ No era el impostor',
      text: `${eliminated.name} era inocente`,
      icon: 'error'
    });

    if (players.length === 2 && players.some(p => p.role === 'impostor')) {
      await showModal({
        title: '🎭 Fin del juego',
        text: 'El impostor gana',
        icon: 'info'
      });
      location.reload();
      return;
    }

    time = +timeInput.value;
    startRound();
  });

  /* INIT */
  generateNameInputs(playersInput.value);
  showScreen('setup');

});
