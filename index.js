// создание переменных
const addButton = document.querySelector(".add");
const createCard = document.querySelector(".create-card_flex");
const saveButton = document.querySelector(".save");
const hideCard = document.querySelector(".arrow");
const cardsStorage = document.querySelector(".cards-storage");
const question = document.querySelector(".question-input");
const closeAllButtons = document.querySelector(".close");
const answer = document.querySelector(".answer-input");
const deleteButton = document.querySelector(".delete");
let id = 0;

// добавление обработчиков

addButton.addEventListener("click", showAddCard);
saveButton.addEventListener("click", saveCard);
closeAllButtons.addEventListener("click", closeAddCard);
deleteButton.addEventListener("click", deleteCards);

cardsStorage.addEventListener("click", (e) => {
  setFlipCard(e.target);
});

// функции, реализующие обработчики

function showAddCard() {
  if (createCard.style.display === "none") createCard.style.display = "block";
  else createCard.style.display = "none";
}

function closeAddCard() {
  createCard.style.display = "none";
}

function deleteCards() {
  cardsStorage.innerHTML = "";
}

function closeCard(element) {
  element.closest(".card").remove();
}

function saveCard() {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  <div class="card__front" style="transform: perspective(600px) rotateY(0deg)">
    <p class="wrapper-arrow">
      <button class="arrow"><i class="arrow-down"></i></button>
    </p>
    <h2 class="card__front_content">${question.value}</h2>
  </div>
  <div class="card__back" style="transform: perspective(600px) rotateY(180deg)">
    <div class="card__answer">
      <p class="wrapper-arrow">
        <button class="arrow"><i class="arrow-down"></i></button>
      </p>
      <p class="card__answer_content">
        ${answer.value}
      </p>
    </div>
  </div>
`;
  card.dataset.id = id++;
  cardsStorage.append(card);
}

function setFlipCard(element) {
  const frontCards = document.querySelectorAll(".card__front");

  if (
    element.classList.contains("card__front") ||
    element.classList.contains("card__back")
  ) {
    flipCard(element, frontCards);
  } else if (element.classList.contains("arrow")) {
    closeCard(element);
  }
}

function flipCard(element, frontCards) {
  frontCards.forEach((frontCard) => {
    if (
      frontCard.closest(".card").dataset.id ===
      element.closest(".card").dataset.id
    ) {
      if (frontCard.style.transform === "perspective(600px) rotateY(0deg)") {
        frontCard.style.transform = "perspective(600px) rotateY(-180deg)";
        frontCard.closest(".card").children[1].style.transform =
          "perspective(600px) rotateY(0deg)";
      } else {
        frontCard.style.transform = "perspective(600px) rotateY(0deg)";
        frontCard.closest(".card").children[1].style.transform =
          "perspective(600px) rotateY(180deg)";
      }
    }
  });
}
