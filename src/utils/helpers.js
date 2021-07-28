import XLSX from 'xlsx';

const key = 'employees';

function exportToXlsx (filename, tableData, header) {
  const ws = XLSX.utils.json_to_sheet(tableData, { header });
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Employees");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

function setEmployeeListToLocalStorage(value) {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }

  localStorage.setItem(key, JSON.stringify(value));
}

function getEmployeeListFromLocalStorage() {
  const values = localStorage.getItem(key);
  if (values) {
    return JSON.parse(values);
  }

  return [];
}

function getObjectValueByStringChain (key, object) {
  return key.split('.').reduce((p,c)=> p && p[c], object);
}

function getFlatObject(object) {
  const stringifyKeys = (obj, str = '', fresh = {}) => {
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++){
      if (typeof obj[keys[i]] === "object" && !Array.isArray(obj[keys[i]]) && obj[keys[i]]) {
        stringifyKeys(obj[keys[i]], str+`${keys[i]}.`, fresh);
      } else {
        fresh[str+keys[i]] = obj[keys[i]];
      }
    }
    return fresh;
  };

 return stringifyKeys(object);
}

export {
  exportToXlsx,
  setEmployeeListToLocalStorage,
  getEmployeeListFromLocalStorage,
  getFlatObject,
  getObjectValueByStringChain,
};
