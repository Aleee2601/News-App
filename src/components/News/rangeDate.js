export const filterArticlesByDate = (articles, startDate, endDate) => {
  if (!startDate && !endDate) {
    return articles; 
  }

  const filteredArticles = articles.filter((article) => {
    const articleDate = new Date(article.publishedAt);
    if (startDate && endDate) {
      return articleDate >= new Date(startDate) && articleDate <= new Date(endDate);
    } else if (startDate) {
      return articleDate >= new Date(startDate);
    } else {
      return articleDate <= new Date(endDate);
    }
  });

  return filteredArticles;
};
