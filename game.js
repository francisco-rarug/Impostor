document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);

  const screens = {
    setup: $("setup"),
    words: $("words"),
    round: $("round"),
    voting: $("voting")
  };

  const playersInput = $("playersInput");
  const timeInput = $("timeInput");
  const categorySelect = $("categorySelect");
  const impostorsInput = $("impostorsInput");
  const playersNamesContainer = $("playersNames");
  const startBtn = $("startBtn");

  const playerTitle = $("playerTitle");
  const card = $("card");
  const cardBack = $("cardBack");
  const nextBtn = $("nextBtn");

  const timerEl = $("timer");
  const goVoteBtn = $("goVoteBtn");

  const votesEl = $("votes");
  const finishVoteBtn = $("finishVoteBtn");

  const categories = {
  argentina: [
    "Mate", "Boliche", "San clemente", "Fernet", "Obelisco",
    "Dulce de leche", "Alfajores", "Pastelitos", "Facturas", "Tango",
    "Malbec", "Puerto madero", "Yerba", "Gaucho", "Cataratas",
    "Glaciar", "Mar del Plata", "Dia de la independencia", "Mendoza", "Dulce de batata",
    "Vigilante", "Belgrano", "25 de mayo", "Avellaneda", "Colegio",
    "Bombilla", "La plata", "Puerto Madero", "La Boca", "Recoleta",
    "Córdoba", "Rosario", "Bariloche", "Iguazú", "San Telmo",
    "Rock nacional", "Picada", "Fútbol argentino", "Cumbia", "Politica",
    "Vino", "Cervezas artesanales", "Mate cocido", "Corrupcion", "Villeros",
    "Chetos", "Milipilis", "Parrilla", "Mendoza", "Chamamé"
  ],
  famosos: [
    "Darín", "Francella", "Lali",
    "Cris Morena", "Ricardo Darín", "Sandro", "Mirtha Legrand", "Susana Giménez",
    "Guillermo Francella", "Macri", "Luisana Lopilato", "Javier Milei",
    "China Suarez", "Ricky Martin", "Cristina Kirchner", "La Roca", "Tom Holland",
    "Wanda Nara", "Florencia Peña", "Barassi", "Donald Trump",
    "Carlos Gardel", "Flavio Azzaro", "Chiqui tapia", "El bananero",
    "Coscu", "Albert Einstein", "Leonardo da Vinci", "Leonardo DiCaprio", "Barack Obama",
    "Papa Francisco", "Will Smith", " Robert Downey Jr.", "Mario Pergolini",
    "Sydney Sweeney", "Mark Zuckerberg", "Scaloni", "Bilardo",
    "Davo Xeneixe", "La cobra", "Gaston Edul", "Alberto Fernandez",
    "Reina Isabell", "Diego Peretti", "Marcelo Tinelli",
    "Jorge Rial", "Michael Jordan", "Kobe Bryant"
  ],
  cantantes: [
    "Duki", "Wos", "Cerati", "Shakira",
    "Bad Bunny", "J Balvin", "Rosalía", "Karol G", "Anuel AA",
    "Rauw Alejandro", "Maluma", "Ozuna", "Nathy Peluso", "Cazzu",
    "Paulo Londra", "Nicki Nicole", "Bizarrap", "TINI", "Andrés Calamaro",
    "Camilo", "ACDC", "Luck Ra", "Bob Marley", "Michael Jackson",
    "Justin Bieber", "Ricky Martin", "Maria Becerra", "Madonna", "Chayanne",
    "Indio Solari", "Romeo Santos", "Daddy Yankee", "Paul McCartney", "Bono",
    "Mick Jagger", "Los Miranda", "Lady Gaga", "Ciro y los persas", "Charly Garcia",
  ],
  futbol: [
    "Messi", "Maradona", "Ronaldo", "Mbappé",
    "Neymar", "Cristiano Ronaldo", "Suárez", "Lewandowski", "Zlatan Ibrahimovic",
    "Kylian Mbappe", "Gareth Bale", "Harry Kane", "Sergio Ramos", "Paulo Dybala",
    "Lautaro Martínez", "Karim Benzema", "Eden Hazard", "Kevin De Bruyne", "Phil Foden",
    "Thiago Silva", "Mané", "Raheem Sterling", "Virgil van Dijk", "Robert Lewandowski",
    "Romelu Lukaku", "Erling Haaland", "Joshua Kimmich", "Toni Kroos", "Frenkie de Jong",
    "Antoine Griezmann", "Marc-André ter Stegen", "Jan Oblak", "Gianluigi Donnarumma", "Ederson",
    "Alisson Becker", "Raphaël Varane", "Trent Alexander-Arnold", "Jadon Sancho", "Paulo Maldini",
    "Andrea Pirlo", "Frank Lampard", "Steven Gerrard", "Thierry Henry", "Zinedine Zidane",
    "Xavi Hernández", "Iniesta", "Ronaldinho", "Kaka", "David Beckham"
  ],
  comidas: [
    "Hamburguesa", "Pizza", "Taco", "Sushi", "Empanada",
    "Asado", "Hotdog", "Ensalada", "Pasta", "Pan",
    "Croissant", "Dulce de leche", "Helado", "Churro", "Arepa",
    "Ceviche", "Paella", "Ramen", "Galleta", "Brownie",
    "Tarta", "Milanesa", "Canelones", "Ñoquis", "Sopa",
    "Burrito", "Falafel", "Lasaña", "Panqueque", "Crepe",
    "Sandwich", "Frutilla", "Manzana", "Banana", "Chocolate",
    "Carne", "Pollo", "Cerdo", "Queso", "Leche",
    "Arroz", "Fideos", "Maíz", "Papas fritas", "Salsa",
    "Mostaza", "Mayonesa", "Ketchup", "Aceituna", "Tomate"
  ],
  animales: [
    "Perro", "Gato", "Elefante", "Tigre", "León",
    "Mono", "Jirafa", "Cebra", "Caballo", "Vaca",
    "Oveja", "Cerdo", "Conejo", "Ratón", "Rata",
    "Lobo", "Zorro", "Panda", "Koala", "Canguro",
    "Tortuga", "Serpiente", "Cocodrilo", "Delfín", "Ballena",
    "Tiburón", "Pez", "Pollo", "Gallina", "Pato",
    "Águila", "Búho", "Pavo", "Pingüino", "Foca",
    "Erizo", "Murciélago", "Ornitorrinco", "Hipopótamo", "Rinoceronte",
    "Camello", "Llama", "Oso", "Oso panda", "Oso polar",
    "Halcón", "Gallo", "Ganso", "Tarántula", "Medusa"
  ],
  "18": [
    "Whisky", "Vodka", "Coctel", "Apuestas", "Casino",
    "Poker", "Striptease", "Pornografia", "Cuarteto", "Porro",
    "Cocaina", "Cigarrillo", "Marihuana", "Tussi", "Vapeo",
    "Nudes", "Sexo", "Erotismo", "Pene", "Prostitutas",
    "Virginidad", "Telos", "Trios", "Travestis", "Dildo",
    "Lencería", "Tetas", "LSD", "Videochat", "Sexo Oral",
    "Sensual", "Stripper", "Sexo Anal", "Only Fans", "Besos",
    "Tinder", "Infidelidad", "Orgasmo", "Lesbianas", "Sexo virtual",
    "Paja", "Excitación", "Gays"
  ]
};


  let players = [];
  let secretWord = "";
  let currentPlayer = 0;
  let timeLeft = 0;
  let timerInterval = null;
  let selectedVote = null;

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.add("hidden"));
    screens[name].classList.remove("hidden");
  }

  function generateNameInputs(count) {
    playersNamesContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const input = document.createElement("input");
      input.placeholder = `Jugador ${i + 1}`;
      playersNamesContainer.appendChild(input);
    }
  }

  playersInput.addEventListener("change", () => {
    generateNameInputs(+playersInput.value);
  });

  startBtn.addEventListener("click", () => {
    const count = +playersInput.value;
    const impostorCount = +impostorsInput.value;
    timeLeft = (+timeInput.value || 1) * 60;

    if (impostorCount >= count) {
      alert("Debe haber menos impostores que jugadores");
      return;
    }

    const names = [...playersNamesContainer.querySelectorAll("input")]
      .map((i, idx) => i.value || `Jugador ${idx + 1}`);

    players = names.map(name => ({ name, role: "player" }));

    shuffle([...Array(count).keys()])
      .slice(0, impostorCount)
      .forEach(i => players[i].role = "impostor");

    const words = categories[categorySelect.value];
    secretWord = words[Math.floor(Math.random() * words.length)];

    currentPlayer = 0;
    updateCard();
    showScreen("words");
  });

  function updateCard() {
    playerTitle.textContent = `Turno de ${players[currentPlayer].name}`;
    card.classList.remove("show");
    cardBack.textContent = "";
  }

  card.addEventListener("click", () => {
    card.classList.toggle("show");
    cardBack.textContent =
      players[currentPlayer].role === "impostor"
        ? "IMPOSTOR"
        : secretWord;
  });

  nextBtn.addEventListener("click", () => {
    currentPlayer++;
    currentPlayer >= players.length ? startRound() : updateCard();
  });


  function startRound() {
    showScreen("round");
    updateTimer();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        startVoting();
      }
    }, 1000);
  }

  function updateTimer() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    timerEl.style.color = timeLeft <= 10 ? "#ef4444" : "#fff";
  }

  goVoteBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    startVoting();
  });

  function startVoting() {
    showScreen("voting");
    votesEl.innerHTML = "";
    selectedVote = null;

    players.forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "vote-player";
      div.textContent = p.name;
      div.onclick = () => {
        selectedVote = i;
        document.querySelectorAll(".vote-player")
          .forEach(v => v.classList.remove("selected"));
        div.classList.add("selected");
      };
      votesEl.appendChild(div);
    });
  }

  finishVoteBtn.addEventListener("click", () => {
    if (selectedVote === null) return;
    animateElimination(players[selectedVote]);
  });

  function animateElimination(player) {
    const isImpostor = player.role === "impostor";
    const remainingImpostors =
      players.filter(p => p.role === "impostor").length - (isImpostor ? 1 : 0);

    const overlay = document.createElement("div");
    overlay.className = "reveal-screen";

    if (isImpostor) {
      overlay.classList.add("impostor-eliminated");
    }

    overlay.innerHTML = `
      <div class="reveal-content">
        <h1>${player.name}</h1>
        <p>${
          isImpostor
            ? `ERA UN IMPOSTOR<br><small>Quedan ${remainingImpostors} impostor${remainingImpostors !== 1 ? "es" : ""}</small>`
            : "ERA INOCENTE"
        }</p>
      </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
      players = players.filter(p => p !== player);
      checkGameState();
    }, 2500);
  }

  function checkGameState() {
    const impostors = players.filter(p => p.role === "impostor");
    const innocents = players.filter(p => p.role !== "impostor");

    if (impostors.length === 0) {
      finalReveal("tripulantes");
      return;
    }

    if (impostors.length >= innocents.length) {
      finalReveal("impostor", impostors);
      return;
    }

    timeLeft = (+timeInput.value || 1) * 60;
    startRound();
  }

  function finalReveal(winner, impostors = []) {
    const reveal = document.createElement("div");
    reveal.className = "reveal-screen";

    if (winner === "impostor") {
      reveal.classList.add("impostor-win");
    }

    reveal.innerHTML = `
      <div class="reveal-content">
        <h1>${winner === "tripulantes" ? "GANAN LOS TRIPULANTES" : "GANAN LOS IMPOSTORES"}</h1>
        ${
          winner === "impostor"
            ? `<div class="reveal-names">
                ${impostors.map((p,i)=>`
                  <div class="reveal-name impostor" style="animation-delay:${i*0.4}s">
                    ${p.name}
                  </div>`).join("")}
              </div>`
            : ""
        }
      </div>
    `;

    document.body.appendChild(reveal);
    setTimeout(() => location.reload(), 6000);
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  generateNameInputs(playersInput.value);
  showScreen("setup");
});
