import React from "react";
import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch }) {
  const handleSearchUser = (event) => {
    if (event && event.target) {
      const searchTerm = event.target.value;
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <Input
        icon={<SearchIcon className="h-5 w-5" />}
        label="Tìm kiếm người dùng..."
        type="text"
        onChange={handleSearchUser}
      />
    </div>
  );
}

export default SearchBar;
