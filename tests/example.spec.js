// @ts-check
import { test, expect } from '@playwright/test';

test('Проверка наличия заголовка по ID', async ({ page }) => {
  await page.goto('https://test-task-tau-three-57.vercel.app/');
  await page.waitForTimeout(1000);
  
  const element = page.locator('#main_title');
  await element.waitFor({ state: 'visible' });

  await expect(element).toHaveText(/Our online courses/);
});

//locator - поиск элементов
//expect - проверяет, что что-то на странице соответствует ожиданиям, и если проверка не проходит, тест падает и делает скрин
//await expect(actual).toBe(expected); actual - ожидаемый результат
//npx playwright test - запустить тесты

test('Проверка что хотя бы 1 карточка прогружается', async ({ page }) => {
  await page.goto('https://test-task-tau-three-57.vercel.app/');
  await page.waitForTimeout(1000);
  
  const element = page.locator('#instructors-list');
  const cards = element.locator('.card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0)
});

test('Все видимые карточки после фильтрации по Development имеют категорию Development', async ({ page }) => {
  await page.goto('https://test-task-tau-three-57.vercel.app/');
  await page.waitForTimeout(1000);
  
  const devButton = page.getByRole('button', { name: 'Development' });
  await devButton.click()

  const cards = page.locator('.card__category')
  const count = await cards.count();

   // Проверяем текст каждой видимой карточки
   for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    if (await card.isVisible()) {
      await expect(card).toHaveText('Development');
    }
  }
});