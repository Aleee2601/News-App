import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Details from "./Details/Details";
import { card, img, btn, text } from "./index";
import "./style.css";

function NewsItem(props) {
  const { imageUrl, alt, description, title, channel, published, urlNews } =
    props;
  return (
    <>
      <Card className="news-card" style={card}>
        <Card.Img style={img} variant="top" src={imageUrl} alt={alt} className="card-image"/>
        <Card.Body className="card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="card-title" style={text}>{description}</Card.Text>
          <Details className="card-text" channel={channel} published={published} />
          <Button className="read-more" href={urlNews} target="_blank" style={btn}>
            Read more →
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
};

export default NewsItem;