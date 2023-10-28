import SearchNotFound from "../../components/atoms/SearchNotFound";
export const handleSearch = (event, data, setRecords) => {
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setRecords(filteredData);

  const isNotFound = !filteredData.length;

  {
    isNotFound && <SearchNotFound filteredData={filteredData} />;
  }
};
