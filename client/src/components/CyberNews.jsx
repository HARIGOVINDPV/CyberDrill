import { useEffect, useState } from "react";

function CyberNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews")
      .then(res => res.json())
      .then(data => {
        setNews(data.items.slice(0, 5)); // show only 5 news
      });
  }, []);

  return (
    <div className="cyber-news">
      <h3>Cybersecurity News</h3>

      {news.map((item, index) => (
        <div key={index} className="news-item">
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.title}
          </a>
          <p>{item.pubDate}</p>
        </div>
      ))}
    </div>
  );
}

export default CyberNews;