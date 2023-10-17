import React from "react";
import BanAccountList from "../../templates/BanAccount";
import { CookiesProvider } from "react-cookie";
function BanAccount() {
  return (
    <div className="bg-background h-full">
      <CookiesProvider>
        <BanAccountList />
      </CookiesProvider>
    </div>
  );
}

export default BanAccount;
