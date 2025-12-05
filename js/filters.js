import { coursesData, renderProducts } from "./main.js";

function filterCourses(category) {
  if (category === "all") {
    renderProducts(coursesData);
  } else {
    const filtered = coursesData.filter((course) =>
      course.category.toLowerCase().includes(category.toLowerCase())
    );
    renderProducts(filtered);
  }
}

export const setupFilterButtons = () => {
  const buttons = document.querySelectorAll(".filters__buttons button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      filterCourses(btn.dataset.category);
    });
  });
};
