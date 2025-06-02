import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faRetweet, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
 
import { CounterWidget } from "../../components/Widgets";
import { EngagementPieChart, EngagementBarChart } from "../../components/EngagementCharts";
 
export default () => {
  return (
    <>
      {/* Top Section: Counter Cards */}
      <Row className="mb-4">
        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CounterWidget
            category="Likes"
            title="5,230"
            icon={faThumbsUp}
            iconColor="primary"
          />
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CounterWidget
            category="Comments"
            title="1,145"
            icon={faComment}
            iconColor="secondary"
          />
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CounterWidget
            category="Retweets"
            title="890"
            icon={faRetweet}
            iconColor="info"
          />
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-4">
          <CounterWidget
            category="Follower Growth"
            title="+1,200"
            icon={faUsers}
            iconColor="success"
          />
        </Col>
      </Row>
 
      {/* Bottom Section: Charts */}
      <Row>
        <Col xs={12} lg={6} className="mb-4">
          <h5 className="mb-3">Engagement Breakdown (Pie)</h5>
          <EngagementPieChart />
        </Col>
 
        <Col xs={12} lg={6} className="mb-4">
          <h5 className="mb-3">Engagement Overview (Bar)</h5>
          <EngagementBarChart />
        </Col>
      </Row>
    </>
  );
};