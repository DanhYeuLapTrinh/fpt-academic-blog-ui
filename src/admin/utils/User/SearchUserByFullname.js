export const handleSearch = (event, data, setRecords) => {
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setRecords(filteredData);
};
