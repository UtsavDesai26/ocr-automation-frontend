import React, { useState, Suspense, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Menu, Layout, Button, Typography, Image } from "antd";
const { Sider, Content } = Layout;
import {
  UserOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  CloseOutlined,
  PlusOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import "./protectedroute.css";
import Loader from "@components/UI/Loader/Loader";
import Logo from "../../../public/logo.png";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MenuItems = [
  getItem("Add Schema", "/addschema", <PlusOutlined />),
  getItem("View Schema", "/viewschemas", <FileSearchOutlined />),
  getItem("Users", "/users", <UserOutlined />),
];

const PrivateRoute = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["opportunities"]);
  const [openSidebar, setOpenSidebar] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpenSidebar(!openSidebar);
    }
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleSubMenuOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Layout className="layout">
      <Sider
        className={`sidebar${openSidebar ? " mobile" : ""}`}
        theme="dark"
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={80}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        responsive={{ md: false, lg: true, xl: true, xxl: true }}
        ref={sidebarRef}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBlock: "20px",
          }}
        >
          <Image width={collapsed ? 50 : 100} src={Logo} />
        </div>
        <div className="menu">
          <Menu
            theme="dark"
            defaultSelectedKeys={[
              window.location.pathname === "/"
                ? "/addschema"
                : window.location.pathname,
            ]}
            selectedKeys={[
              window.location.pathname === "/"
                ? "/addschema"
                : window.location.pathname,
            ]}
            mode="inline"
            items={MenuItems}
            openKeys={openKeys}
            onOpenChange={handleSubMenuOpenChange}
            onClick={handleMenuClick}
          />
          <Button
            className="collapse-btn"
            type="text"
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Button
            className="close-btn"
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpenSidebar(!openSidebar)}
          />
        </div>
      </Sider>
      <Layout>
        {/* <Header className="header">
          <Button
            className="menu-icon"
            icon={<MenuOutlined />}
            onClick={() => setOpenSidebar(!openSidebar)}
          />
          {userIcon}
        </Header> */}
        <Content className="content-layout">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateRoute;
