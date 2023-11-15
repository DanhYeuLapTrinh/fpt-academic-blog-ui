import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";
import { toSlug } from "../../../utils/StringMethod";

export default function SearchBarService() {
  const { accountName, setAccountName } = useHome();
  const navigate = useNavigate();
  const handleSearchAccount = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && e.target.value !== "") {
      setAccountName(e.target.value);
      navigate(`/accounts/${e.target.value}`);
      setAccountName("");
    }
  };
  return (
    <SearchBar
      accountName={accountName}
      setAccountName={setAccountName}
      handleSearchAccount={handleSearchAccount}
    />
  );
}
