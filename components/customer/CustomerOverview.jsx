import { useEffect, useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { COLORS_GENDER, COLORS_GENERATION } from "@/lib/constant";
import PieChartCustomizedLabel from "@/components/chart/PieChartCustomizedLabel";

const CustomerOverview = () => {
  const [genderCount, setGenderCount] = useState([]);
  const [generationCount, setGenerationCount] = useState([]);
  const [registeredQuarterly, setRegisteredQuarterly] = useState([]);

  const getCountCustomerGender = async () => {
    const apiUrlEndpoint = "/api/customer/count-gender";
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setGenderCount(res.customer);
  };

  const getCountCustomerGeneration = async () => {
    const apiUrlEndpoint = "/api/customer/count-generation";
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setGenerationCount(res.customer);
  };

  const getTotalRegisteredCustomerQuarterly = async () => {
    const apiUrlEndpoint = "/api/customer/total-registered-quarterly";
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setRegisteredQuarterly(res.customer);
  };

  useEffect(() => {
    getCountCustomerGender();
    getCountCustomerGeneration();
    getTotalRegisteredCustomerQuarterly();
  }, []);

  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <Card
          title={
            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Total Registered Customer
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {genderCount.reduce(
                    (curr, value) => curr + value.total_gender,
                    0
                  )}
                </Typography.Title>
              </Col>
            </Row>
          }
          bordered={false}
        >
          {generationCount.length > 0 && (
            <ResponsiveContainer height={300}>
              <AreaChart
                id="total_registered_customer"
                data={registeredQuarterly}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total_registered_customer"
                  name="Total Registered Customer"
                  stroke="#0088FE"
                  fill="#0088FE"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>
      </Col>
      <Col span={5}>
        <Card title="Gender" bordered={false}>
          <ResponsiveContainer height={300}>
            <PieChart id="total_gender">
              <Pie
                data={genderCount}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={<PieChartCustomizedLabel />}
                outerRadius={120}
                fill="#8884d8"
                dataKey="total_gender"
                nameKey="gender"
              >
                {genderCount.map((item) => (
                  <Cell
                    key={`cell-${item.gender}`}
                    fill={
                      COLORS_GENDER[
                        item.gender.split(" ").join("").toLowerCase()
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={11}>
        <Card title="Generation" bordered={false}>
          {generationCount.length > 0 && (
            <ResponsiveContainer height={300}>
              <BarChart id="total_generation" data={generationCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="total_generation"
                  name="Total Generation"
                  fill="black"
                >
                  {generationCount.map((item) => (
                    <Cell
                      key={`cell-${item.name}`}
                      fill={
                        COLORS_GENERATION[
                          item.name.split(" ").join("").toLowerCase()
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default CustomerOverview;
