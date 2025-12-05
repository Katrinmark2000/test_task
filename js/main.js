import { ProductCard } from "./productCard.js";
import { buttonsGenerated } from "./buttons.js";
import { setupFilterButtons } from "./filters.js";
import { setupSearch } from "./search.js";
import { updateCountButton } from "./countByCategory.js";

export let coursesData = [];
export let filteredCourses = [];
let visibleCount = 9;
const CARDS_PER_PAGE = 9;
const coursesList = document.getElementById("instructors-list");
const loadMoreBtn = document.querySelector(".load-more__button");

// Загрузка данных
async function loadData() {
  try {
    const response = await fetch("./data/courses.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

// Рендер карточек
export function renderProducts(courses = filteredCourses) {
  coursesList.innerHTML = "";
  const visibleCourses = courses.slice(0, visibleCount);
  visibleCourses.forEach((course) => {
    const cardElement = ProductCard(course);
    coursesList.appendChild(cardElement);
  });

  // Скрываем кнопку "Load more", если карточек больше нет
  if (visibleCount >= courses.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "flex";
  }
}

// Кнопка "Load more"
function setupLoadMoreButton() {
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += CARDS_PER_PAGE;
    renderProducts();
  });
}

// Инициализация приложения
async function init() {
  buttonsGenerated();
  try {
    coursesList.innerHTML = '<p class="loading">Загрузка курсов...</p>';
    coursesData = await loadData();
    filteredCourses = [...coursesData]; // Изначально все курсы
    updateCountButton(coursesData);
    setupLoadMoreButton();
    setupFilterButtons();
    setupSearch();
    renderProducts();
  } catch (error) {
    coursesList.innerHTML = '<p class="error">Ошибка загрузки данных</p>';
  }
}

document.addEventListener("DOMContentLoaded", init);

// Функция для установки фильтра и обновления видимых карточек
export function setFilteredCourses(courses) {
  filteredCourses = courses;
  visibleCount = CARDS_PER_PAGE;
  renderProducts();
}
