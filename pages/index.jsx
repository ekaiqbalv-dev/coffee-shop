import { Button, Space, DatePicker, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LineChart, Line } from "recharts";
import Pagecontainer from "@/components/PageContainer";

export default function Home() {
  const data = [{ name: "Page A", uv: 100, pv: 2400, amt: 2400 },{ name: "Page B", uv: 200, pv: 2400, amt: 2400 }];
  const onChange = () => {};
  return (
    <Pagecontainer title="Coffee Shop">
      <div>Example</div>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
        <SearchOutlined style={{ fontSize: 60, color: "green" }} />
        <Card>
          <p>Card content</p>
        </Card>
      </Space>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </Pagecontainer>
  );
}
