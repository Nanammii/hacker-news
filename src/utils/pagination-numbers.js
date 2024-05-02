import {NEWS_PER_PAGE} from "../const.js";

export const getPaginationNumbers = (page, count) => {
  const indent = 1;
  const length = Math.ceil(count / Math.max(NEWS_PER_PAGE, 1));

  console.log(length)

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(page - indent, 1);
  let right = Math.min(left + indent * 2, length);
  // Корректировка когда страница в конце
  left = Math.max(right - indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let numbers = [];
  // Первая страница всегда нужна
  if (left > 1) numbers.push(1);
  // Пропуск
  if (left > 2) numbers.push(null);
  // Последовательность страниц
  for (let page = left; page <= right; page++) numbers.push(page);
  // Пропуск
  if (right < length - 1) numbers.push(null);
  // Последняя страница
  if (right < length) numbers.push(length);

  return numbers;
}
