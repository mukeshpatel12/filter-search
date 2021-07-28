export const fields = ['name', 'username', 'email', 'street', 'suite', 'city', 'zipcode', 'lat', 'lng', 'phone', 'website', 'companyName', 'catchPhrase', 'bs'];

export const requiredFields = ['name', 'email', 'city', 'companyName'];

// const isLastElement = (arr, index) => {
//   return ((arr.length - 1) === index);
// }

// export const getObjectByFields = () => {
//   const object = {};

//   fields.forEach((field) => {
//     const depths = field.split('.');

//     if (depths.length > 1) {
//       let previousField = '';
//       depths.reduce((pr, cur, idx, arr) => {
//         if (previousField) {
//           const newObj = {};
//           if (isLastElement(arr, idx)) {
//             pr[pr[previousField]] = { ...pr[pr[previousField]], [cur]: '' };
//             return pr;      
//           }
  
//           newObj[cur] = {};
//           pr[previousField] = newObj[cur];
//         } else {
//           pr[cur] = {};
//         }

//         previousField = cur;
//         return pr;
//       }, {});
//     }
//   });
// }

export const getRequiredFieldNames = () => {
  return requiredFields;
}

export const getEmployeesFields = () => {
  return fields;
}