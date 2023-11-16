import React from "react";
import SearchBar from "./SearchBar";
import useHome from "../../../hooks/useHome";

export default function SearchBarService() {
  const { accountName, setAccountName } = useHome();
  return (
    <SearchBar
      accountName={accountName}
      setAccountName={setAccountName}
    />
  );
}
