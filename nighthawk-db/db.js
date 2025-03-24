const db = {};

const addEntry = (key, value) => {
  db[key] = value;
};

const updateEntry = (key, value) => {
  if (db[key]) {
    db[key] = value;
  } else {
    throw new Error('Entry not found');
  }
};

const deleteEntry = (key) => {
  if (db[key]) {
    delete db[key];
  } else {
    throw new Error('Entry not found');
  }
};

const getEntry = (key) => {
  return db[key] || null;
};

const getReports = (status = null, type = null, startDate = null) => {
  return Object.values(db).filter((report) => {
    if (status && report.status !== status) {
      return false;
    }
    if (type && report.type !== type) {
      return false;
    }
    if (startDate && report.createdAt < startDate) {
      return false;
    }
    return true;
  });
};

const sortReports = (field, order = 'asc') => {
  return Object.values(db).sort((a, b) => {
    if (order === 'asc') {
      return a[field] > b[field] ? 1 : -1;
    } else {
      return a[field] < b[field] ? 1 : -1;
    }
  });
};

module.exports = {
  addEntry,
  updateEntry,
  deleteEntry,
  getEntry,
  getReports,
  sortReports,
};