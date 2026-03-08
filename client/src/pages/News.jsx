import { useLocation } from "react-router-dom";
import SimulationNavbar from "../components/SimulationNavbar";

function News() {
  const location = useLocation();
  const article = location.state;

  return (
    <div className="min-h-screen  text-white">

      <SimulationNavbar />

      <div className="flex justify-center mt-10">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl w-full">

          <h1 className="text-2xl font-bold mb-4">
            {article.title}
          </h1>

          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt="news"
              className="rounded mb-4"
            />
          )}

          <p className="mb-6 text-gray-300">
            {article.description}
          </p>

          <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="mt-10 px-4 py-2 bg-cyan-200 text-black font-semibold rounded hover:bg-cyan-300 transition"
          >
            Read original article →
          </a>

        </div>
      </div>

    </div>
  );
}

export default News;