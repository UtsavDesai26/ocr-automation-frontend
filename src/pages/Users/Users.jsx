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
      className: "antd-table-column-min-width-200",
      render: (_, __, index) => {
        const { current = 1, pageSize = 10 } = pagination;
        return (current - 1) * pageSize + index + 1;
      },
      align: "center",
    },
    {
      title: "Response Path",
      dataIndex: "responsePath",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Request ID",
      dataIndex: "requestId",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Triggered At",
      dataIndex: "triggeredAt",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Bot ID",
      dataIndex: "botId",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Bot Connection ID",
      dataIndex: "botConnectionId",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Bot Name",
      dataIndex: "botName",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Bot Platform",
      dataIndex: "botPlatform",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Bot Language",
      dataIndex: "botLanguage",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Current Language",
      dataIndex: "currentLanguage",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Channel ID",
      dataIndex: "channelId",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Handle",
      dataIndex: "userHandle",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User First Name",
      dataIndex: "userFirstName",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Last Name",
      dataIndex: "userLastName",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Gender",
      dataIndex: "userGender",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Locale",
      dataIndex: "userLocale",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Phone",
      dataIndex: "userPhone",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Country",
      dataIndex: "userCountry",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Timezone",
      dataIndex: "userTimezone",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Company",
      dataIndex: "userCompany",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User External ID",
      dataIndex: "userExternalId",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User First Active",
      dataIndex: "userFirstActive",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "User Last Active",
      dataIndex: "userLastActive",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Datetime Received",
      dataIndex: "datetimeReceived",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Message",
      dataIndex: "message",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Message Type",
      dataIndex: "messageType",
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Attributes (User Choice)",
      dataIndex: ["attributes", "user_choice"],
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Attributes (Last Upload ID)",
      dataIndex: ["attributes", "last_upload_id"],
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Metadata (Is Bot)",
      dataIndex: ["metadata", "is_bot"],
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Metadata (Chat ID)",
      dataIndex: ["metadata", "chat_id"],
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Metadata (Chat Type)",
      dataIndex: ["metadata", "chat_type"],
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
    },
    {
      title: "Metadata (Message ID)",
      dataIndex: ["metadata", "message_id"],
      className: "antd-table-column-min-width-200",
      render: (value) => value || "-",
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
