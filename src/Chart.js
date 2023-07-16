import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartComponent(props) {

  return (
    <ResponsiveContainer width="95%" height={200}>
      <AreaChart
        width="100%"
        height={200}
        data={props.data}

        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <Tooltip/>
        {/* <CartesianGrid/> */}
        <XAxis dataKey="date" hide={true}/>
        <YAxis dataKey="price" hide={true}/>
        <Area type="linear" dataKey="price" stroke="#82ca9d" fill="url(#colorPrice)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
export default ChartComponent;