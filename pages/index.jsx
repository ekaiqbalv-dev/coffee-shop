import { Breadcrumb } from "antd";
import PageLayout from "@/components/PageLayout";
import CustomerOverview from "@/components/customer/CustomerOverview";

const Home = () => {
  return (
    <PageLayout title="Coffee Shop" header="Customer">
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          minHeight: 360,
        }}
      >
        <CustomerOverview />
      </div>
    </PageLayout>
  );
};
export default Home;
