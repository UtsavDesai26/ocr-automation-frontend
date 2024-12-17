import React, { useState } from "react";
import {
  Col,
  Row,
  Input,
  Select,
  Button,
  Space,
  Layout,
  Typography,
  Spin,
  message,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { postgresDataTypes } from "@utils/const";
import axiosInstance from "@utils/axios";
import { api } from "@utils/apis";

const AddSchema = () => {
  const navigate = useNavigate();

  const defaultField = { fieldName: "", fieldType: postgresDataTypes[0].value };
  const [loading, setLoading] = useState(false);
  const [schemaFields, setSchemaFields] = useState([defaultField]);
  const [schemaName, setSchemaName] = useState("");

  const handleAddField = () => {
    setSchemaFields([...schemaFields, defaultField]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = schemaFields.filter((_, i) => i !== index);
    setSchemaFields(updatedFields);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...schemaFields];
    updatedFields[index][key] = value;
    setSchemaFields(updatedFields);
  };

  const handleCancel = () => {
    setSchemaFields([defaultField]);
    setSchemaName("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isSchemaNameValid = schemaName.trim() !== "";
    const isFieldsValid = schemaFields.every(
      (field) => field.fieldName.trim() !== "" && field.fieldType.trim() !== ""
    );

    if (!isSchemaNameValid) {
      message.error("Schema name is required!");
      setLoading(false);
      return;
    }

    if (!isFieldsValid) {
      setLoading(false);
      message.error("All fields must be filled!");
      return;
    }

    try {
      const payload = {
        name: schemaName,
        fields: schemaFields.map((field) => ({
          name: field.fieldName.trim(),
          type: field.fieldType.trim(),
        })),
      };
      const response = await axiosInstance.post(api.addSchema, payload);
      message.success("Schema added successfully!");
      handleCancel();
    } catch (error) {
      message.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const showCancelButton =
    schemaFields.length > 1 ||
    schemaFields.every(
      (field) => field.fieldName.trim() !== "" && field.fieldType.trim() !== ""
    ) ||
    schemaName.trim() !== "";

  return (
    <Spin spinning={loading}>
      <Layout>
        <Layout className="content">
          <Space direction="vertical">
            <Layout className="page-header" style={{ marginBottom: "20px" }}>
              <Row justify="space-between" gutter={[20, 10]}>
                <Col>
                  <Typography.Title level={4}>Add Schema</Typography.Title>
                </Col>
              </Row>
            </Layout>
            <Layout className="page-header">
              <div>
                <Typography.Text strong>Schema Name</Typography.Text>
                <Input
                  placeholder="Enter schema name"
                  value={schemaName}
                  onChange={(e) => setSchemaName(e.target.value)}
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
                <div style={{ flex: schemaFields.length > 1 ? "60%" : "65%" }}>
                  <Typography.Text strong>Field Name</Typography.Text>
                </div>
                <div style={{ flex: "35%" }}>
                  <Typography.Text strong>Field Type</Typography.Text>
                </div>
                {schemaFields.length > 1 && <div style={{ flex: "5%" }}></div>}
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
                      flex: schemaFields.length > 1 ? "60%" : "65%",
                      paddingRight: "10px",
                    }}
                  >
                    <Input
                      placeholder="Enter field name"
                      value={field.fieldName}
                      onChange={(e) =>
                        handleFieldChange(index, "fieldName", e.target.value)
                      }
                    />
                  </div>
                  <div
                    style={{
                      flex: "35%",
                      paddingRight: schemaFields.length > 1 ? "10px" : "0px",
                    }}
                  >
                    <Select
                      placeholder="Select field type"
                      value={field.fieldType}
                      onChange={(value) =>
                        handleFieldChange(index, "fieldType", value)
                      }
                      style={{ width: "100%" }}
                    >
                      {postgresDataTypes?.map((type) => (
                        <Select.Option key={type.value} value={type.value}>
                          {type.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  {schemaFields.length > 1 && (
                    <div style={{ flex: "5%", textAlign: "center" }}>
                      {schemaFields.length > 1 && (
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => handleRemoveField(index)}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Col>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={handleAddField}
                  style={{ marginTop: "10px" }}
                >
                  Add Field
                </Button>
              </Col>

              <Col style={{ textAlign: "end", marginTop: "20px" }}>
                <Space>
                  {showCancelButton && (
                    <Button
                      onClick={handleCancel}
                      style={{ paddingInline: "20px" }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ paddingInline: "20px" }}
                  >
                    Submit
                  </Button>
                </Space>
              </Col>
            </Layout>
          </Space>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default AddSchema;
