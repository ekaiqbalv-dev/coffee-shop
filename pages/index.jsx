import { useEffect, useState } from "react";
import { Button, Space, DatePicker, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LineChart, Line } from "recharts";
import Pagecontainer from "@/components/PageContainer";

export default function Home() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [chartData, setChartData] = useState([
    { name: "Page A", uv: 100, pv: 400, amt: 1400 },
    { name: "Page B", uv: 200, pv: 1400, amt: 2400 },
  ]);
  const onChange = () => {};

  async function getPageData() {
    const apiUrlEndpoint = "/api/lala";
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    console.log(res);
  }

  useEffect(() => {
    console.log('cek')
    getPageData();
    setShouldAnimate(true);
    setChartData((prev) => [
      ...prev,
      { name: "Page C", uv: 400, pv: 2400, amt: 3400 },
    ]);
  }, []);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);
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
      <LineChart id={1} width={400} height={400} data={chartData}>
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          isAnimationActive={shouldAnimate}
        />
      </LineChart>
    </Pagecontainer>
  );
}
