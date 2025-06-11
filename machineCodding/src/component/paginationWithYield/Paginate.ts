const allItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

function* paginate(items, pageSize) {
  for (let i = 0; i <= items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

export { allItems, paginate };

export const allMyItems = Array.from({ length: 20 }, (_, i) => `Item ${i}`);

export function* paginateStar(items, pageSize) {
  for (let i = 0; i <= items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}
