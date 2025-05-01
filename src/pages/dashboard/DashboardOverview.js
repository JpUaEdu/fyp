
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable, EngagementStatsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { EngagementPieChart, EngagementBarChart } from "../../components/EngagementCharts";

export default () => {
  return (
    <>
    <Row>
  <Col xs={12} lg={6} className="mb-4">
    <h5 className="mb-3">Engagement Stats</h5>
    <EngagementStatsTable />
  </Col>
</Row>
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
