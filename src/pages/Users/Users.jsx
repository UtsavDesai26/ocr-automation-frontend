import React, { useEffect, useState } from "react";
import { Col, Layout, Row, Space, Typography, Spin } from "antd";
import axiosInstance from "@utils/axios";
import { api } from "@utils/apis";
import AntdTable from "@components/AntdTable/AntdTable";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
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
      dataIndex: "userId",
      className: "antd-table-column-min-width-100",
    },
    {
      title: "User name",
      dataIndex: "name",
      className: "antd-table-column-min-width-200",
    },
    {
      title: "User Mobile Number",
      dataIndex: "mobileNo",
      className: "antd-table-column-min-width-200",
    },
    {
      title: "User Email",
      dataIndex: "email",
      className: "antd-table-column-min-width-200",
    },
    {
      title: "User Gender",
      dataIndex: "gender",
      className: "antd-table-column-min-width-200",
    },
    {
      title: "User Country",
      dataIndex: "country",
      className: "antd-table-column-min-width-200",
    },
  ];

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(api.getUsers);
      if (Array.isArray(res.data)) {
        setAllUsers(res.data);
        setPagination((prev) => ({
          ...prev,
          total: res.data.length || 0,
        }));
        updatePageData(1, pagination.pageSize, res.data);
      } else {
        setAllUsers([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updatePageData = (page, pageSize, data = allUsers) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }));
    setDataSource(data.slice(startIndex, endIndex));
  };

  const handleTableChange = ({ current, pageSize }) => {
    updatePageData(current, pageSize);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Spin spinning={loading}>
      <Layout>
        <Layout className="content">
          <Space direction="vertical">
            <Layout className="page-header" style={{ marginBottom: "20px" }}>
              <Row justify="space-between" gutter={[20, 10]}>
                <Col>
                  <Typography.Title level={4}>Users</Typography.Title>
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

export default Users;
