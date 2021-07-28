export const getEmployeesListFromJson = () => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch('mockData.json', requestOptions)
    .then(res => res.json());
}