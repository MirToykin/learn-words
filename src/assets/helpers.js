export const getFilteredSet = (set, query, field) => {
  return set.filter(setItem => setItem[field].startsWith(query));
}