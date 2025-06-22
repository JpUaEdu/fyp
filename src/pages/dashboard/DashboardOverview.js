import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faRetweet, faUsers, faStar } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form } from "@themesberg/react-bootstrap";
import { CounterWidget } from "../../components/Widgets";
import { useNavigate } from "react-router-dom";


export default function DashboardOverview() {
  const [partnerships, setPartnerships] = useState([]);
  const [engagement, setEngagement] = useState({
    likes: 0,
    comments: 0,
    retweets: 0,
    replies: 0,
  });
  const [score, setScore] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";  // or "/login", whichever your login route is
    return;
  }

  const fetchPartnerships = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/partnerships", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setPartnerships(data);
    } catch (err) {
      console.error("❌ Error fetching partnerships:", err);
    }
  };

  fetchPartnerships();
}, []);


  const handlePartnershipChange = async (e) => {
    const value = e.target.value;
    if (!value) return;

    const [brand_id, figure_id] = value.split(",");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/engagement/${brand_id}/${figure_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("📊 Engagement:", data);

      setEngagement({
        likes: data.likes || 0,
        comments: data.comments || 0,
        retweets: data.retweets || 0,
        replies: data.replies || 0,
      });

      setScore(data.score ?? null);
    } catch (error) {
      console.error("❌ Error fetching engagement:", error.message);
    }
  };

  return (
    <>
      {/* Partnerships Dropdown - moved to top */}
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <h5 className="mb-2">My Partnerships</h5>
          <Form.Select onChange={handlePartnershipChange}>
            <option value="">Select a partnership</option>
            {partnerships.map((p, index) => (
              <option key={index} value={`${p.brand_id},${p.figure_id}`}>
                {p.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Engagement Stats Widgets */}
      <Row className="mb-4">
        <Col xs={12} sm={6} lg={3}>
          <CounterWidget category="Likes" title={engagement.likes.toLocaleString()} icon={faThumbsUp} iconColor="primary" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <CounterWidget category="Comments" title={engagement.comments.toLocaleString()} icon={faComment} iconColor="secondary" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <CounterWidget category="Retweets" title={engagement.retweets.toLocaleString()} icon={faRetweet} iconColor="tertiary" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <CounterWidget category="Replies" title={engagement.replies.toLocaleString()} icon={faUsers} iconColor="info" />
        </Col>
        <Col xs={12} sm={6} lg={3} className="mt-4">
          <CounterWidget
            category="Partnership Score"
            title={score !== null ? score.toFixed(2) : "N/A"}
            icon={faStar}
            iconColor="warning"
          />
        </Col>
      </Row>
    </>
  );
}
