export function ProductCard({
  title,
  image,
  category,
  price,
  instructor,
  currency,
}) {
  const template = document.getElementById("cards__courses-template");
  const card = template.content.cloneNode(true);
  const currencySymbol = currency === "USD" ? "$" : currency;

  card.querySelector(".card__img").src = image;
  card.querySelector(".card__img").alt = `фото инструктора ${instructor}`;
  card.querySelector(".card__title").textContent = title;
  card.querySelector(".card__price").textContent = `${currencySymbol}${price}`;
  card.querySelector(".card__author").textContent = `| by ${instructor}`;

  const categoryElement = card.querySelector(".card__category");
  categoryElement.textContent = category;
  colorOfCategory(categoryElement, category);

  return card;
}

function colorOfCategory(categoryElement, category) {
  switch (category) {
    case "Marketing":
      categoryElement.classList.add("green");
      break;
    case "Management":
      categoryElement.classList.add("blue");
      break;
    case "HR & Recruting":
      categoryElement.classList.add("orange");
      break;
    case "Design":
      categoryElement.classList.add("pink");
      break;
    case "Development":
      categoryElement.classList.add("purple");
      break;
  }
}
