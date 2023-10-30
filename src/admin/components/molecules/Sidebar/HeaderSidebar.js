import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function HeaderSidebar() {
  return (
    <div className="mb-2">
      <Link to={"/welcome"}>
        <Typography className="text-custom text-5xl text-center font-bold cursor-pointer pb-2">
          fblog
        </Typography>
      </Link>
    </div>
  );
}

export default HeaderSidebar;
