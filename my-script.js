const container = document.querySelector(".container-b");
const basket = document.querySelector(".basket");
const modal = document.querySelector(".modal");
const data = [
  {
    id: 1,
    img: "./Imgs/1.png",
    txt: "Парикмахерское кресло Норм гидравлическое",
    price: "9 900 ₽",
    buy: "Купить",
    soni: 1,
  },
  {
    id: 2,
    img: "./Imgs/1.png",
    txt: "Парикмахерское кресло Норм гидравлическое",
    price: "9 900₽",
    buy: "Купить",
    soni: 1,
  },
  {
    id: 3,
    img: "./Imgs/1.png",
    txt: "Парикмахерское кресло Норм гидравлическое",
    price: "9 900₽",
    buy: "Купить",
    soni: 1,
  },
];
const basketItems = JSON.parse(localStorage.getItem("basket")) || [];
// Функция для открытия и закрытия модального окна
function toggleModal() {
  if (isModalOpen) {
    modal.style.transform = "translateX(100%)";
    modal.style.transition = "transform 1s";
    isModalOpen = false;
  } else {
    modal.style.transform = "translateX(0px)";
    modal.style.transition = "transform 1s";
    isModalOpen = true;
    renderBasket();
  }
}

//function increment
function increment(id) {
  basketItems.forEach((item) => {
    if (item.id === id) {
      item.soni = item.soni + 1;
      item.totalPrice = (
        parseFloat(item.price.replace(/[^\d.]/g, "")) * item.soni
      ).toFixed(2);
    }
  });
  localStorage.setItem("basket", JSON.stringify(basketItems));
  renderBasket();
}

//function decriment
function decriment(id) {
  basketItems.forEach((item) => {
    if (item.id === id) {
      if (item.soni > 1) {
        item.soni = item.soni - 1;
        item.totalPrice = (
          parseFloat(item.price.replace(/[^\d.]/g, "")) * item.soni
        ).toFixed(2);
      }
    }
  });
  renderBasket();
}

function deleteItem(id) {
  basketItems.map((item, index) => {
    if (item.id === id) {
      basketItems.splice(index, 1);
    }
  });
  localStorage.setItem("basket", JSON.stringify(basketItems));
  renderBasket();
}

function renderBasket() {
  modal.innerHTML = "";
  basketItems.forEach((item) => {
    modal.innerHTML += `
      <div class="korzinka-box">
        <img src="${item.img}">
        <p>${item.txt}</p>
        <h1>${item.totalPrice}</h1> <!-- Общая стоимость товара -->
        <div class="plusminus">
          <button onclick="decriment(${item.id})">-</button>
        </div>
        <h1>${item.soni}</h1>
        <div class="plusminus">
          <button onclick="increment(${item.id})">+</button>
        </div>
        <div class="deleted-img">
          <button onclick="deleteItem(${item.id})">
            <img src="./social-icon/Delete.svg">
          </button>
        </div>
      </div>
    `;
  });
}

// Функция для добавления товара в корзину
function addToBasket(index) {
  const newItem = data[index];
  // Проверяем, есть ли уже товар с таким же id в корзине
  const existingItem = basketItems.find((item) => item.id === newItem.id);
  if (existingItem) {
    // Если товар уже есть в корзине, увеличиваем его количество
    existingItem.soni += 1;
    existingItem.totalPrice = (
      parseFloat(existingItem.price.replace(/[^\d.]/g, "")) * existingItem.soni
    ).toFixed(2);
  } else {
    // Иначе добавляем новый товар в корзину
    newItem.soni = 1;
    newItem.totalPrice = parseFloat(
      newItem.price.replace(/[^\d.]/g, "")
    ).toFixed(2);
    basketItems.push(newItem);
  }
  localStorage.setItem("basket", JSON.stringify(basketItems));
  renderBasket(); // Добавляем вызов функции renderBasket() для обновления корзины
}

// Добавляем обработчик события для кнопки "Корзина"
basket.addEventListener("click", toggleModal);

data.map((item, index) => {
  container.innerHTML += `
    <div class="box">
      <img src="${item.img}" alt="${item.txt}">
      <p>${item.txt}</p>
      <h1>${item.price}</h1>
      <button onclick="addToBasket(${index})">${item.buy}</button>
    </div>
  `;
});

let isModalOpen = false;

// Добавляем обработчик события для кнопки "Закрыть" в модальном окне
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModal);
