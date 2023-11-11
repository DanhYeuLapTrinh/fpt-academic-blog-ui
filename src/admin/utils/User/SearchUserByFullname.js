export const handleSearch = (event, data, setRecords) => {
  const filteredData = data.filter((item) =>
    item.fullName.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setRecords(filteredData);
};
