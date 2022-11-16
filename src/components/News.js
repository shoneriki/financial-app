import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/news",
    };

    axios
      .request(options)
      .then((response) => {
        console.log("news api went into the .then");
        // console.log(response.data);
        // setArticles(response.data);
      })
      .catch((error) => {
        console.log("the news feed error");
        console.error(error);
      });
  }, []);

  const firstFiveArticles = articles?.slice(0, 5);

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {firstFiveArticles?.map((article, index) => (
        <div className="news-article" key={index}>
          <a href={article.url} _blank="true">
            {article.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
