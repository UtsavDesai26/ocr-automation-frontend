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
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

const ViewSchemaData = () => {
  const { schemaName: schemaName } = useParams();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize,
    total: 0,
  });

  const generateColumns = (data) => {
    if (!data || data.length === 0) return [];

    const keys = Object.keys(data[0]);
    return keys.map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      render: (value) => {
        if (typeof value === "boolean") return value ? "Yes" : "No";
        return value;
      },
      width: key.length * 10,
      className: "antd-table-column-min-width-100",
    }));
  };

  const fetchSchemaData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${api.getSchemaDataByName}/${schemaName}/data`
      );
      const data = Array.isArray(res.data) ? res.data : [];
      setAllData(data);
      setPagination((prev) => ({ ...prev, total: data.length || 0 }));

      if (data.length > 0) {
        const dynamicColumns = generateColumns(data);
        setColumns([
          {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => {
              const { current, pageSize } = pagination;
              return (current - 1) * pageSize + index + 1;
            },
            align: "center",
            className: "antd-table-column-min-width-50",
          },
          ...dynamicColumns,
        ]);
        updatePageData(1, pagination.pageSize, data);
      }
    } catch (error) {
      console.error("Error fetching schema data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemaData();
  }, []);

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

  const handleExportToXLSX = () => {
    if (allData.length === 0) {
      message.warning("No data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, schemaName);
    XLSX.writeFile(workbook, `${schemaName}_data.xlsx`);
  };

  return (
    <Spin spinning={loading}>
      <Layout>
        <Layout className="content">
          <Space direction="vertical">
            <Layout className="page-header" style={{ marginBottom: "20px" }}>
              <Row justify="space-between" gutter={[20, 10]}>
                <Col>
                  <Typography.Title level={4}>
                    {schemaName}'s Analysis Data
                  </Typography.Title>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#4CAF50",
                      borderColor: "#4CAF50",
                      color: "white",
                    }}
                    onClick={handleExportToXLSX}
                  >
                    Export to XLSX
                  </Button>
                </Col>
              </Row>
            </Layout>
            <Layout className="page-header">
              <Col span={24}>
                <AntdTable
                  rowKey="id"
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

export default ViewSchemaData;
