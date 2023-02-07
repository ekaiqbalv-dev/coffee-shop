import { Breadcrumb } from "antd";
import PageLayout from "@/components/PageLayout";
import SalesOverview from "@/components/sales/SalesOverview";

const Sales = () => {
  return (
    <PageLayout title="Coffee Shop" header="Sales">
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Sales</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          minHeight: 360,
        }}
      >
        <SalesOverview />
      </div>
    </PageLayout>
  );
};
export default Sales;
