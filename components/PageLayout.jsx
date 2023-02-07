import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

function getItem(label, link, key, icon, children) {
  return {
    key,
    icon,
    children,
    link,
    label: <Link href={link}>{label}</Link>,
  };
}

const menuItems = [
  getItem("Customer", "/", "1", <UserOutlined />),
  getItem("Sales", "/sales", "2", <DollarCircleOutlined />),
];

const PageLayout = (props) => {
  const { title, header, children } = props;
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              padding: "8px",
              margin: "16px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            Coffee Shop
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={menuItems
              .filter((item) => item.link === router.route)
              .map((item) => item.key)}
            mode="inline"
            items={menuItems}
          />
        </Layout.Sider>
        <Layout className="site-layout">
          <Layout.Header
            style={{
              padding: "0 16px",
              background: colorBgContainer,
            }}
          >
            <h1>{header}</h1>
          </Layout.Header>
          <Layout.Content
            style={{
              margin: "0 16px",
            }}
          >
            {children}
          </Layout.Content>
          <Layout.Footer
            style={{
              textAlign: "center",
            }}
          >
            Coffe Shop ©2023
          </Layout.Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default PageLayout;
