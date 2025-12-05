function countByCategory(courses) {
  const counts = {};

  courses.forEach((course) => {
    const category = course.category;
    if (counts[category]) {
      counts[category]++;
    } else {
      counts[category] = 1;
    }
  });

  return counts;
}

export function updateCountButton(courses) {
  const counts = countByCategory(courses);
  const buttons = document.querySelectorAll(".filters__buttons button");

  buttons.forEach((button) => {
    const countSpan = button.querySelector(".count");
    const category = button.dataset.category;

    if (category === "all") {
      countSpan.textContent = courses.length;
      return;
    }

    //приводим все к одному регистру
    const normalizedCategory = category.toLowerCase();

    // Ищем совпадения по ключам
    let total = 0;
    for (const cat in counts) {
      const amount = counts[cat];
      if (cat.toLowerCase().includes(normalizedCategory)) {
        total += amount;
      }
    }

    countSpan.textContent = total;
  });
}
