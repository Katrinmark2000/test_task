import { coursesData, renderProducts } from "./main.js";

const searchInput = document.querySelector(".filters__search .input");

//функция поиска
function searchCourses(courses, searchQuery) {
  if (!searchQuery.trim()) {
    return courses;
  }

  const searchWords = searchQuery.toLowerCase().trim().split(/\s+/);

  return courses.filter((course) => {
    const searchableText = `${course.title}`.toLowerCase();

    return searchWords.some((word) => searchableText.includes(word));
  });
}

export function setupSearch() {
  searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value;
    const filteredCourses = searchCourses(coursesData, searchQuery);
    renderProducts(filteredCourses);
  });
}
