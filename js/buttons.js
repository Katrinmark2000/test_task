const categories = [
  { name: "All", value: "all" },
  { name: "Marketing", value: "Marketing" },
  { name: "Management", value: "Management" },
  { name: "HR & Recruting", value: "HR & Recruting" },
  { name: "Design", value: "Design" },
  { name: "Development", value: "Development" },
];

export const buttonsGenerated = () => {
  const filtersContainer = document.getElementById("filters");
  filtersContainer.innerHTML = categories
    .map(
      (cat) => `
      <button type="button" data-category="${cat.value}" class="${
        cat.value === "all" ? "active" : ""
      }">
        ${cat.name}<span class="count"></span>
      </button>
    `
    )
    .join("");
};
