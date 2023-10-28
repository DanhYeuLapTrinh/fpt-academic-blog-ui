import React from "react";
import HeaderSidebar from "../../../components/molecules/Sidebar/HeaderSidebar";
import BodySidebar from "../../../components/molecules/Sidebar/BodySidebar";
import { Card } from "@material-tailwind/react";

export default function Sidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border-r-2 border-solid">
      <HeaderSidebar />
      <BodySidebar />
    </Card>
  );
}
