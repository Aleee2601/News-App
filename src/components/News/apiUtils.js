import axios from "axios";
import { endpointPath } from "../../config/api";

export async function fetchArticles(country, newscategory) {
  try {
    const response = await axios.get(endpointPath(country, newscategory));
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Propagate the error to the caller
  }
}

export function filterArticlesByDate(articles, startDate, endDate) {
  return articles.filter(article => {
    const articleDate = new Date(article.publishedAt);
    return (
      (!startDate || articleDate >= startDate) &&
      (!endDate || articleDate <= endDate)
    );
  });
}
