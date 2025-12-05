import { ProductCard } from "./productCard.js";
import { buttonsGenerated } from "./buttons.js";
import { setupFilterButtons } from "./filters.js";
import { setupSearch } from "./search.js";
import { updateCountButton } from "./countByCategory.js";

export let coursesData = [];
let visibleCount = 9;
const CARDS_PER_PAGE = 9;
const coursesList = document.getElementById("instructors-list");
const loadMoreBtn = document.querySelector(".load-more__button");

async function loadData() {
  try {
    const response = await fetch("./data/courses.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

export function renderProducts(courses = coursesData) {
  coursesList.innerHTML = "";
  const visibleCourses = courses.slice(0, visibleCount);
  visibleCourses.forEach((course) => {
    const cardElement = ProductCard(course);
    coursesList.appendChild(cardElement);
  });
}

function setupLoadMoreButton() {
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += CARDS_PER_PAGE;
    renderProducts(coursesData);
  });
}

async function init() {
  buttonsGenerated();
  try {
    coursesList.innerHTML = '<p class="loading">Загрузка курсов...</p>';
    coursesData = await loadData();
    updateCountButton(coursesData);
    setupLoadMoreButton();
    setupFilterButtons();
    setupSearch();
    renderProducts(coursesData);
  } catch (error) {
    coursesList.innerHTML = '<p class="error">Ошибка загрузки данных</p>';
  }
}

document.addEventListener("DOMContentLoaded", init);
