import React, { useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Badge } from "@themesberg/react-bootstrap";
 
export default function FeedbackDashboard() {
  const [comments, setComments] = useState({ positive: [], neutral: [], negative: [] });
  const [feedbackInfo, setFeedbackInfo] = useState(null);
 
  useEffect(() => {
    const stored = localStorage.getItem("prediction");
    if (!stored) return;
 
    const prediction = JSON.parse(stored);
    const {
      brand = "",
      figure = "",
      likes = 0,
      replies = 0,
      retweets = 0,
      positive_ratio = 0,
      neutral_ratio = 0,
      negative_ratio = 0,
      avg_commenter_verification_score = 0,
    } = prediction;
 
    console.log("📦 Requesting comments for:", { brand, figure });
 
    // Weighted scoring logic (Sentiment 50%, Engagement 30%, Verification 20%)
 
    // Sentiment (out of 50)
    const sentiment_positive = positive_ratio * 20;
    const sentiment_neutral = neutral_ratio * 10;
    const sentiment_negative = (1 - negative_ratio) * 20;
    const sentiment_total = sentiment_positive + sentiment_neutral + sentiment_negative;
 
    // Engagement (out of 30) using log scale
    const log_likes = Math.log1p(likes) / Math.log1p(2_000_000) * 15;
    const log_retweets = Math.log1p(retweets) / Math.log1p(500_000) * 10;
    const log_replies = Math.log1p(replies) / Math.log1p(200_000) * 5;
    const engagement_total = log_likes + log_retweets + log_replies;
 
    // Verification (out of 20)
    const capped_verification = Math.min(avg_commenter_verification_score, 200);
    const verification_score = (capped_verification / 200) * 20;
 
    // Combine all
    const total_score = sentiment_total + engagement_total + verification_score;
    const error_margin = Math.random() * -3.5; // between 0 and -3.5
    const final_score = Math.max(0, Math.min(100, total_score + error_margin));
 
    // Determine dominant sentiment
    let sentiment = "neutral";
    if (positive_ratio > negative_ratio && positive_ratio > neutral_ratio) {
      sentiment = "positive";
    } else if (negative_ratio > positive_ratio && negative_ratio > neutral_ratio) {
      sentiment = "negative";
    }
 
    setFeedbackInfo({
      brand,
      figure,
      score: Math.round(final_score * 100) / 100,
      sentiment,
    });
 
    // Fetch grouped comments
    fetch("http://127.0.0.1:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, figure }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && typeof data === "object") {
          setComments(data);
        } else {
          console.error("❌ Invalid comment response format:", data);
          setComments({ positive: [], neutral: [], negative: [] });
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching comments:", err.message);
        setComments({ positive: [], neutral: [], negative: [] });
      });
  }, []);
 
  if (!feedbackInfo) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3>Loading feedback...</h3>
      </div>
    );
  }
 
  const sentimentColor =
    feedbackInfo.sentiment === "positive"
      ? "success"
      : feedbackInfo.sentiment === "neutral"
      ? "warning"
      : "danger";
 
  const renderComments = (commentList) =>
    commentList?.length > 0 ? (
      commentList.map((c, i) => (
        <ListGroup.Item key={i}>
          <strong>{c.commenter_account_name}</strong>: {c.comment_text}
        </ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item>No comments available.</ListGroup.Item>
    );
 
  return (
    <div style={{ padding: "2rem" }}>
      <h2>
        Feedback for {feedbackInfo.brand} × {feedbackInfo.figure}
      </h2>
 
      <h3>
        Score:{" "}
        <Badge bg={feedbackInfo.score >= 70 ? "success" : feedbackInfo.score >= 40 ? "warning" : "danger"}>
          {feedbackInfo.score}/100
        </Badge>
      </h3>
 
      <h4 className="mt-3">
        Dominant Sentiment:{" "}
        <Badge bg={sentimentColor}>{feedbackInfo.sentiment}</Badge>
      </h4>
 
      {/* Comments Grouped by Sentiment */}
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Header>🟢 Positive Comments</Card.Header>
            <ListGroup variant="flush">
              {renderComments(comments?.positive)}
            </ListGroup>
          </Card>
        </Col>
 
        <Col md={4}>
          <Card>
            <Card.Header>🟡 Neutral Comments</Card.Header>
            <ListGroup variant="flush">
              {renderComments(comments?.neutral)}
            </ListGroup>
          </Card>
        </Col>
 
        <Col md={4}>
          <Card>
            <Card.Header>Negative Comments</Card.Header>
            <ListGroup variant="flush">
              {renderComments(comments?.negative)}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}