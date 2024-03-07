import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { Col, Row, Form, Pagination, Dropdown, Button } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath, endpointSearch } from "../../config/api";
import { Container, Header, card } from "./index";
import { paginate } from "./paginationUtils";
import DatePicker from "react-datepicker";
import { filterArticlesByDate } from "./rangeDate";
import "react-datepicker/dist/react-datepicker.css";

function News({ newscategory = "general", country = "us" }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState("date");
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(
            endpointSearch(searchQuery, fromDate, toDate)
          );
        } else {
          response = await axios.get(endpointPath(country, newscategory));
        }

        let sortedArticles = response.data.articles;
        if (sortBy === "date") {
          sortedArticles = response.data.articles.sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return sortAscending ? dateA - dateB : dateB - dateA;
          });
        }
        setArticles(sortedArticles);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    searchQuery,
    fromDate,
    toDate,
    country,
    newscategory,
    sortBy,
    sortAscending,
  ]);

  useEffect(() => {
    document.title = `${
      newscategory.charAt(0).toUpperCase() + newscategory.slice(1)
    } - News`;
  }, [newscategory]);

  const currentArticles = paginate(articles, currentPage, postsPerPage);
  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (sortType) => {
    if (sortType === sortBy) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(sortType);
      setSortAscending(true);
    }
  };

  const handleApplyDateRange = () => {
    console.log("Start Date:", selectedStartDate);
    console.log("End Date:", selectedEndDate);
    const filteredArticles = filterArticlesByDate(
      articles,
      selectedStartDate,
      selectedEndDate
    );
    console.log("Filtered Articles:", filteredArticles);
    setArticles(filteredArticles);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(articles.length / postsPerPage);
  console.log(articles);

  function renderPagination() {
    return (
      <Row>
        <Col>
          <Pagination className="justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
                className="bg-dark text-white"
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(newscategory)}</Header>
          <Container>
            <Row className="mb-3" style={{ color: "white" }}>
              <Form.Group controlId="postsPerPageSelect">
                <Form.Label>Posts per page:</Form.Label>
                <Form.Control
                  className="form-control-lg bg-dark mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0 text-white shadow-sm border-dark"
                  as="select"
                  value={postsPerPage}
                  onChange={handlePostsPerPageChange}
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={16}>16</option>
                </Form.Control>
              </Form.Group>

              <Dropdown className="SortingByDate ml-4 mt-4 ">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Sort by Date {sortAscending ? "(asc)" : "(desc)"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSortChange("date")}>
                    Ascending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange("date")}>
                    Descending
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="ml-3 mt-4 RangeDropdown">
                <Dropdown.Toggle variant="primary" id="date-dropdown">
                  Date Range
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form.Group className="m-2">
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={(date) => setSelectedStartDate(date)}
                      selectsStart
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      placeholderText="Start Date"
                      className="form-control"
                    />
                  </Form.Group>
                  <Form.Group className="m-2">
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={(date) => setSelectedEndDate(date)}
                      selectsEnd
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      minDate={selectedStartDate}
                      placeholderText="End Date"
                      className="form-control"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="m-2"
                    onClick={handleApplyDateRange}
                  >
                    OK
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Row>
              {currentArticles.map((element) => (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={card}
                  key={element.publishedAt}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="News image"
                    publishedAt={element.publishedAt}
                    imageUrl={element.urlToImage || NullImage}
                    urlNews={element.url}
                  />
                </Col>
              ))}
            </Row>
            {renderPagination()}
          </Container>
        </>
      )}
    </>
  );
}

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
