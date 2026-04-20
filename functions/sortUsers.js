function sortUsers(data, path, order = 'desc') {
  const getValue = (obj, path) =>
    path.split('.').reduce((o, p) => o?.[p], obj);

  return Object.entries(data).sort(([, a], [, b]) => {
    const valA = getValue(a, path);
    const valB = getValue(b, path);

    return order === 'asc' ? valA - valB : valB - valA;
  });
};

module.exports = { sortUsers };