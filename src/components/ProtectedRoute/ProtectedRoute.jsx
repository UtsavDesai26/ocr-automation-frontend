import React, { useState, Suspense, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Menu, Layout, Button, Image } from "antd";
const { Sider, Content } = Layout;
import {
  UserOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  CloseOutlined,
  PlusOutlined,
  FileSearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./protectedroute.css";
import Loader from "@components/UI/Loader/Loader";
import Logo from "../../../public/logo.png";
import { Header } from "antd/es/layout/layout";

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
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 576);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        openSidebar
      ) {
        setOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebar]);

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className="layout">
      <Sider
        className={`sidebar ${openSidebar ? "" : "mobile"}`}
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
        responsive={{ lg: true, xl: true, xxl: true }}
        ref={sidebarRef}
        style={
          isMobileView
            ? {
                display: openSidebar ? "block" : "none",
                position: "absolute",
                zIndex: 99,
              }
            : {}
        }
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
        <Header className="header">
          <Button
            className="menu-icon"
            icon={<MenuOutlined />}
            onClick={() => setOpenSidebar(!openSidebar)}
          />
          {/* {userIcon} */}
        </Header>
        <Content>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateRoute;
