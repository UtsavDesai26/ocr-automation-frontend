import React from "react";
import { Result, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={18} md={12} lg={10}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you are looking for does not exist."
          extra={
            <Button type="primary">
              <Link to="/">Back To Home</Link>
            </Button>
          }
        />
      </Col>
    </Row>
  );
}

export default NotFound;
