export const handleSearch = (event, data, setRecords) => {
  const filteredData = data.filter((item) =>
    item.fullname.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setRecords(filteredData);
};
