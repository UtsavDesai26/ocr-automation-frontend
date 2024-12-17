import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Input,
  Select,
  Space,
  Layout,
  Typography,
  Spin,
  Divider,
} from "antd";
import { useParams } from "react-router-dom";
import { postgresDataTypes } from "@utils/const";
import axiosInstance from "@utils/axios";
import { api } from "@utils/apis";

const ViewParticularSchema = () => {
  const { schemaName: schemaName } = useParams();

  const defaultField = { fieldName: "", fieldType: postgresDataTypes[0].value };
  const [loading, setLoading] = useState(false);
  const [schemaFields, setSchemaFields] = useState([defaultField]);

  const fetchSchema = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${api.getSchemaByName}/${schemaName}`
      );
      if (res.data && res.data.fields) {
        setSchemaFields(
          res.data.fields.map((field) => ({
            fieldName: field.name,
            fieldType: field.type,
          }))
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchema();
  }, []);

  return (
    <Spin spinning={loading}>
      <Layout>
        <Layout className="content">
          <Space direction="vertical">
            <Layout className="page-header" style={{ marginBottom: "20px" }}>
              <Row justify="space-between" gutter={[20, 10]}>
                <Col>
                  <Typography.Title level={4}>
                    {schemaName} Schema
                  </Typography.Title>
                </Col>
              </Row>
            </Layout>
            <Layout className="page-header">
              <div>
                <Typography.Text strong>Schema Name</Typography.Text>
                <Input
                  placeholder="Enter schema name"
                  value={schemaName}
                  disabled
                  style={{ marginTop: "8px" }}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                <div style={{ flex: "65%" }}>
                  <Typography.Text strong>Field Name</Typography.Text>
                </div>
                <div style={{ flex: "35%" }}>
                  <Typography.Text strong>Field Type</Typography.Text>
                </div>
              </div>
              {schemaFields?.map((field, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      flex: "65%",
                      paddingRight: "10px",
                    }}
                  >
                    <Input
                      placeholder="Enter field name"
                      value={field.fieldName}
                      disabled
                    />
                  </div>
                  <div
                    style={{
                      flex: "35%",
                    }}
                  >
                    <Select
                      placeholder="Select field type"
                      value={field.fieldType}
                      disabled
                      style={{ width: "100%" }}
                    >
                      {postgresDataTypes?.map((type) => (
                        <Select.Option key={type.value} value={type.value}>
                          {type.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              ))}
            </Layout>
          </Space>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default ViewParticularSchema;
