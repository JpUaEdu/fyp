import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faRetweet,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button } from "@themesberg/react-bootstrap";
import { CounterWidget } from "../../components/Widgets";
import {
  EngagementPieChart,
  EngagementBarChart,
} from "../../components/EngagementCharts";
 
export default function PredictionDashboard() {
  const [prediction, setPrediction] = useState(null);
  const history = useHistory();
 
  useEffect(() => {
    const stored = localStorage.getItem("prediction");
    if (stored) setPrediction(JSON.parse(stored));
  }, []);
 
  if (!prediction) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3>No prediction data found</h3>
        <p>Please submit a brand/figure first.</p>
      </div>
    );
  }
 
  const {
    likes = 0,
    replies = 0,
    retweets = 0,
    positive_ratio = 0,
    neutral_ratio = 0,
    negative_ratio = 0,
  } = prediction;
  const followerGrowth = Math.round((likes + replies + retweets) * 0.0005);
 
  return (
    <>
<Row className="mb-4">
  <Col xs={12} md={6} lg={3} className="mb-3">
    <CounterWidget
      category="Likes"
      title={likes.toLocaleString()}
      icon={faThumbsUp}
      iconColor="primary"
      className="w-100"
    />
  </Col>
  <Col xs={12} md={6} lg={3} className="mb-3">
    <CounterWidget
      category="Comments"
      title={replies.toLocaleString()}
      icon={faComment}
      iconColor="secondary"
      className="w-100"
    />
  </Col>
  <Col xs={12} md={6} lg={3} className="mb-3">
    <CounterWidget
      category="Retweets"
      title={retweets.toLocaleString()}
      icon={faRetweet}
      iconColor="info"
      className="w-100"
    />
  </Col>
  <Col xs={12} md={6} lg={3} className="mb-3">
    <CounterWidget
      category="Follower Growth"
      title={`+${followerGrowth.toLocaleString()}`}
      icon={faUsers}
      iconColor="success"
      className="w-100"
    />
  </Col>
</Row>
 
 
 
      {/* Charts */}
      <Row>
        <Col xs={12} lg={6} className="mb-4">
          <h5 className="mb-3">Prediction Breakdown (Pie)</h5>
          <EngagementPieChart
            data={[positive_ratio, neutral_ratio, negative_ratio]}
          />
        </Col>
        <Col xs={12} lg={6} className="mb-4">
          <h5 className="mb-3">Prediction Overview (Bar)</h5>
          <EngagementBarChart
            data={{ likes, replies, retweets, followerGrowth }}
          />
        </Col>
      </Row>
 
      {/* Navigate to Feedback */}
      <Row className="text-center mt-4">
        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => history.push("/dashboard/feedback")}
          >
            Generate Feedback
          </Button>
        </Col>
      </Row>
    </>
  );
}