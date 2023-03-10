import { useEffect, useState } from "react";
import { Card, Col, DatePicker, Empty, Row, Typography } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  BarChart,
  Bar,
} from "recharts";
import dayjs from "dayjs";

import PieChartCustomizedLabel from "@/components/chart/PieChartCustomizedLabel";
import {
  COLORS_OUTLET,
  COLORS_SOLD_STATUS,
  COLORS_TARGET,
} from "@/lib/constant";

const SalesOverview = () => {
  const [dateTotalTarget, setDateTotalTarget] = useState("2019-04-01");
  const [monthTotalReceipt, setMonthTotalReceipt] = useState("2019-04");
  const [
    dateRangeProductGroupSoldQuantity,
    setDateRangeProductGroupSoldQuantity,
  ] = useState(["2019-04-01", "2019-04-29"]);
  const [
    dateRangeProductCategorySoldQuantity,
    setDateRangeProductCategorySoldQuantity,
  ] = useState(["2019-04-01", "2019-04-29"]);
  const [
    dateRangeProductTypeSoldQuantity,
    setDateRangeProductTypeSoldQuantity,
  ] = useState(["2019-04-01", "2019-04-29"]);
  const [totalTargetByDate, setTotalTargetByDate] = useState([]);
  const [totalOutletType, setTotalOutletType] = useState([]);
  const [monthlyTotalReceipt, setMonthlyTotalReceipt] = useState([]);
  const [productGroupSoldQuantity, setProductGroupSoldQuantity] = useState([]);
  const [productCategorySoldQuantity, setProductCategorySoldQuantity] =
    useState([]);
  const [productTypeSoldQuantity, setProductTypeSoldQuantity] = useState([]);

  const getTotalTargetByDate = async (date) => {
    const apiUrlEndpoint = "/api/sales/target/total-by-date?";
    const response = await fetch(
      apiUrlEndpoint +
        new URLSearchParams({
          date: date,
        })
    );
    const res = await response.json();
    const formatted =
      Object.keys(res.target)
        .filter((key) => key != "date")
        .map((key) => ({ name: key, value: Number(res.target[key]) })) || [];
    setTotalTargetByDate(formatted);
  };

  useEffect(() => {
    getTotalTargetByDate(dateTotalTarget);
  }, [dateTotalTarget]);

  const onChangeDateTotalTarget = (_date, dateString) => {
    setDateTotalTarget(dateString);
  };

  const getTotalOutletType = async () => {
    const apiUrlEndpoint = "/api/sales/outlet/total-type";
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setTotalOutletType(res.outlet);
  };

  useEffect(() => {
    getTotalOutletType();
  }, []);

  const getTotalReceiptMonthly = async (date) => {
    const [year, month] = date.split("-");
    const apiUrlEndpoint = "/api/sales/receipt/total-monthly?";
    const response = await fetch(
      apiUrlEndpoint +
        new URLSearchParams({
          month,
          year,
        })
    );
    const res = await response.json();
    setMonthlyTotalReceipt(res.receipt);
  };

  useEffect(() => {
    getTotalReceiptMonthly(monthTotalReceipt);
  }, [monthTotalReceipt]);

  const onChangeMonthTotalReceipt = (_date, dateString) => {
    setMonthTotalReceipt(dateString);
  };

  const getProductGroupSoldQuantity = async (dateRange) => {
    const [start, end] = dateRange;
    const apiUrlEndpoint = "/api/sales/receipt/quantity-by-product-group?";
    const response = await fetch(
      apiUrlEndpoint +
        new URLSearchParams({
          start,
          end,
        })
    );
    const res = await response.json();
    setProductGroupSoldQuantity(res.product_group);
  };

  useEffect(() => {
    getProductGroupSoldQuantity(dateRangeProductGroupSoldQuantity);
  }, [dateRangeProductGroupSoldQuantity]);

  const onChangDateRangeProductGroup = (_date, dateRange) => {
    setDateRangeProductGroupSoldQuantity(dateRange);
  };

  const getProductCategorySoldQuantity = async (dateRange) => {
    const [start, end] = dateRange;
    const apiUrlEndpoint = "/api/sales/receipt/quantity-by-product-category?";
    const response = await fetch(
      apiUrlEndpoint +
        new URLSearchParams({
          start,
          end,
        })
    );
    const res = await response.json();
    setProductCategorySoldQuantity(res.product_category);
  };

  useEffect(() => {
    getProductCategorySoldQuantity(dateRangeProductCategorySoldQuantity);
  }, [dateRangeProductCategorySoldQuantity]);

  const onChangDateRangeProductCategory = (_date, dateRange) => {
    setDateRangeProductCategorySoldQuantity(dateRange);
  };

  const getProductTypeSoldQuantity = async (dateRange) => {
    const [start, end] = dateRange;
    const apiUrlEndpoint = "/api/sales/receipt/quantity-by-product-type?";
    const response = await fetch(
      apiUrlEndpoint +
        new URLSearchParams({
          start,
          end,
        })
    );
    const res = await response.json();
    setProductTypeSoldQuantity(res.product_type);
  };

  useEffect(() => {
    getProductTypeSoldQuantity(dateRangeProductTypeSoldQuantity);
  }, [dateRangeProductTypeSoldQuantity]);

  const onChangDateRangeProductType = (_date, dateRange) => {
    setDateRangeProductTypeSoldQuantity(dateRange);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={5}>
        <Card
          title={
            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Total Outlet
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {totalOutletType.reduce((curr, item) => curr + item.total, 0)}
                </Typography.Title>
              </Col>
            </Row>
          }
          bordered={false}
        >
          <ResponsiveContainer height={348}>
            <PieChart id="daily_total_target">
              <Pie
                data={totalOutletType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={<PieChartCustomizedLabel />}
                outerRadius={120}
                fill="#8884d8"
                dataKey="total"
                nameKey="type"
              >
                {totalOutletType.map((item) => (
                  <Cell
                    key={`cell-${item.type}`}
                    fill={
                      COLORS_OUTLET[item.type.split(" ").join("").toLowerCase()]
                    }
                  />
                ))}
              </Pie>
              <Tooltip itemStyle={{ textTransform: "capitalize" }} />
              <Legend wrapperStyle={{ textTransform: "capitalize" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={5}>
        <Card
          title={
            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Daily Total Target
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {totalTargetByDate.reduce(
                    (curr, item) => curr + item.value,
                    0
                  )}
                </Typography.Title>
              </Col>
            </Row>
          }
          bordered={false}
        >
          <DatePicker
            value={dateTotalTarget && dayjs(dateTotalTarget)}
            onChange={onChangeDateTotalTarget}
            style={{ marginBottom: "16px" }}
          />
          <ResponsiveContainer height={300}>
            {totalTargetByDate.every((item) => item.value !== 0) ? (
              <PieChart key={dateTotalTarget} id="daily_total_target">
                <Pie
                  data={totalTargetByDate}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={<PieChartCustomizedLabel />}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {totalTargetByDate.map((item) => (
                    <Cell
                      key={`cell-${item.name}`}
                      fill={
                        COLORS_TARGET[
                          item.name.split(" ").join("").toLowerCase()
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip itemStyle={{ textTransform: "capitalize" }} />
                <Legend wrapperStyle={{ textTransform: "capitalize" }} />
              </PieChart>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={14}>
        <Card title="Monthly Receipt" bordered={false}>
          <DatePicker
            value={monthTotalReceipt && dayjs(monthTotalReceipt)}
            onChange={onChangeMonthTotalReceipt}
            picker="month"
            style={{ marginBottom: "16px" }}
          />
          <ResponsiveContainer height={300}>
            {monthlyTotalReceipt.length > 0 ? (
              <AreaChart
                id="monthly_total_receipt"
                data={monthlyTotalReceipt}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(item) => dayjs(item).format("DD MMM")}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(item) => dayjs(item).format("DD MMM YYYY")}
                  itemStyle={{ textTransform: "capitalize" }}
                  formatter={(item, name) => {
                    if (name === "sales") return `$${item}`;
                    return item;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="transaction"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="quantity"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Product Group Sold Quantity" bordered={false}>
          <DatePicker.RangePicker
            value={
              dateRangeProductGroupSoldQuantity && [
                dayjs(dateRangeProductGroupSoldQuantity[0]),
                dayjs(dateRangeProductGroupSoldQuantity[1]),
              ]
            }
            onChange={onChangDateRangeProductGroup}
            style={{ marginBottom: "16px" }}
          />
          <ResponsiveContainer height={300}>
            {productGroupSoldQuantity.length > 0 ? (
              <BarChart
                id="product_group_sold_quantity"
                data={productGroupSoldQuantity}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[
                    0,
                    Math.max(
                      ...productGroupSoldQuantity.map((item) =>
                        Number(item.quantity)
                      )
                    ),
                  ]}
                  tickCount={20}
                />
                <Tooltip />
                <Legend
                  payload={[
                    { value: "High Sold", color: "#00C49F" },
                    { value: "Medium Sold", color: "#0088FE" },
                    { value: "Low Sold", color: "#FFBB28" },
                  ]}
                  formatter={(val) => val}
                />
                <Bar dataKey="quantity" name="Quantity" fill="black">
                  {productGroupSoldQuantity.map((item) => (
                    <Cell
                      key={`cell-${item.name}`}
                      fill={
                        COLORS_SOLD_STATUS[
                          item.status.split(" ")[0].toLowerCase()
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Product Category Sold Quantity" bordered={false}>
          <DatePicker.RangePicker
            value={
              dateRangeProductCategorySoldQuantity && [
                dayjs(dateRangeProductCategorySoldQuantity[0]),
                dayjs(dateRangeProductCategorySoldQuantity[1]),
              ]
            }
            onChange={onChangDateRangeProductCategory}
            style={{ marginBottom: "16px" }}
          />
          <ResponsiveContainer height={300}>
            {productCategorySoldQuantity.length > 0 ? (
              <BarChart
                id="product_category_sold_quantity"
                data={productCategorySoldQuantity}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[
                    0,
                    Math.max(
                      ...productCategorySoldQuantity.map((item) =>
                        Number(item.quantity)
                      )
                    ),
                  ]}
                  tickCount={20}
                />
                <Tooltip />
                <Legend
                  payload={[
                    { value: "High Sold", color: "#00C49F" },
                    { value: "Medium Sold", color: "#0088FE" },
                    { value: "Low Sold", color: "#FFBB28" },
                  ]}
                  formatter={(val) => val}
                />
                <Bar dataKey="quantity" name="Quantity" fill="#0088FE">
                  {productCategorySoldQuantity.map((item) => (
                    <Cell
                      key={`cell-${item.name}`}
                      fill={
                        COLORS_SOLD_STATUS[
                          item.status.split(" ")[0].toLowerCase()
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Product Type Sold Quantity" bordered={false}>
          <DatePicker.RangePicker
            value={
              dateRangeProductTypeSoldQuantity && [
                dayjs(dateRangeProductTypeSoldQuantity[0]),
                dayjs(dateRangeProductTypeSoldQuantity[1]),
              ]
            }
            onChange={onChangDateRangeProductType}
            style={{ marginBottom: "16px" }}
          />
          <ResponsiveContainer height={300}>
            {productTypeSoldQuantity.length > 0 ? (
              <BarChart
                id="product_type_sold_quantity"
                data={productTypeSoldQuantity}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[
                    0,
                    Math.max(
                      ...productTypeSoldQuantity.map((item) =>
                        Number(item.quantity)
                      )
                    ),
                  ]}
                  tickCount={20}
                />
                <Tooltip />
                <Legend
                  payload={[
                    { value: "High Sold", color: "#00C49F" },
                    { value: "Medium Sold", color: "#0088FE" },
                    { value: "Low Sold", color: "#FFBB28" },
                  ]}
                  formatter={(val) => val}
                />
                <Bar dataKey="quantity" name="Quantity" fill="#0088FE">
                  {productTypeSoldQuantity.map((item) => (
                    <Cell
                      key={`cell-${item.name}`}
                      fill={
                        COLORS_SOLD_STATUS[
                          item.status.split(" ")[0].toLowerCase()
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};
export default SalesOverview;
