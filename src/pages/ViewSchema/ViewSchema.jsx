import React, { useEffect, useState } from "react";
import {
  Col,
  Layout,
  Row,
  Space,
  Typography,
  Spin,
  Button,
  Modal,
  message,
} from "antd";
import axiosInstance from "@utils/axios";
import { api } from "@utils/apis";
import AntdTable from "@components/AntdTable/AntdTable";
import {
  EyeOutlined,
  DeleteOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ViewSchema = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize,
    total: 0,
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      className: "antd-table-column-min-width-50",
      render: (_, __, index) => {
        const { current, pageSize } = pagination;
        return (current - 1) * pageSize + index + 1;
      },
      align: "center",
    },
    {
      title: "ID",
      dataIndex: "id",
      className: "antd-table-column-min-width-100",
    },
    {
      title: "Schema",
      dataIndex: "name",
      className: "antd-table-column-min-width-300",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      className: "antd-table-column-min-width-50",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={
              <EyeOutlined style={{ color: "#1890ff", fontSize: "18px" }} />
            }
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={
              <DatabaseOutlined
                style={{ color: "#52c41a", fontSize: "18px" }}
              />
            }
            onClick={() => handleViewData(record)}
          />
          <Button
            type="text"
            icon={
              <DeleteOutlined style={{ color: "#ff4d4f", fontSize: "18px" }} />
            }
            onClick={() => confirmDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    navigate(`/viewschema/${record?.name}`);
  };

  const handleViewData = (record) => {
    navigate(`/viewschema/${record?.name}/data`);
  };

  const confirmDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schema?",
      content: `Schema: ${record?.name}`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(record),
    });
  };

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`${api.deleteSchemaByName}/${record?.name}`);
      message.success("Schema deleted successfully!");
      fetchAllSchemas();
    } catch (error) {
      message.error("Failed to delete the schema.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSchemas = async () => {
    try {
      const res = await axiosInstance.get(api.getSchemas);
      if (Array.isArray(res.data)) {
        setAllData(res.data);
        setPagination((prev) => ({ ...prev, total: res.data.length || 0 }));
        updatePageData(1, pagination.pageSize, res.data);
      } else {
        setAllData([]);
        message.warning("No schemas found.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, [allData]);

  const updatePageData = (page, pageSize, data = allData) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
    setDataSource(data.slice(startIndex, endIndex));
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    updatePageData(current, pageSize);
  };

  useEffect(() => {
    fetchAllSchemas();
  }, []);

  return (
    <Spin spinning={loading}>
      <Layout>
        <Layout className="content">
          <Space direction="vertical">
            <Layout className="page-header" style={{ marginBottom: "20px" }}>
              <Row justify="space-between" gutter={[20, 10]}>
                <Col>
                  <Typography.Title level={4}>View Schemas</Typography.Title>
                </Col>
              </Row>
            </Layout>
            <Layout className="page-header">
              <Col span={24}>
                <AntdTable
                  columns={columns}
                  dataSource={dataSource}
                  pagination={{
                    ...pagination,
                    showSizeChanger: true,
                    onChange: (page, pageSize) =>
                      updatePageData(page, pageSize),
                  }}
                  onChange={handleTableChange}
                />
              </Col>
            </Layout>
          </Space>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default ViewSchema;
