import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "10px 16px 20px" }}>
          <div className="responsive-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
