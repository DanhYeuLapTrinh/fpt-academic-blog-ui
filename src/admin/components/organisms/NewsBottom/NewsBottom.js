import React from "react";
import { useNewsContext } from "../../../context/NewsContext";
import { Link } from "react-router-dom";

function NewsBottom() {
  const { news } = useNewsContext();

  return (
    <div>
      <p style={{ fontSize: "14px", fontWeight: "bold" }}>Tin khác</p>
      {news.map((item) => (
        <ul key={item.newsId}>
          <li>
            <span style={{ marginRight: "4px", color: "GrayText" }}>
              {item.newsAt} -{" "}
            </span>
            <Link to={`/news/view/${item.newsId}`}>
              <span>{item.title}</span>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default NewsBottom;
