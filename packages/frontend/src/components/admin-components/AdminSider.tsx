import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const {  Sider } = Layout;

function AdminSider() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div  />
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashboard",
              icon: <AppstoreOutlined />,
              key: "/admin/dashboard",
            },
            {
              label: "Lead Management",
              key: "/admin/lead-management",
              icon: <HomeOutlined />,
            },
            {
              label: "User Management",
              key: "/admin/user-management",
              icon: <UserOutlined />,
            },
          ]}
        />
      </Sider>
  );
}

export default AdminSider;
