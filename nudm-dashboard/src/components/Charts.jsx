import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Charts = ({ chartData }) => {
  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/20 mt-10 p-8 rounded-[30px] shadow-xl border border-gray-100">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-4xl font-black text-white">
  City Wise Collection
</h2>

<p className="text-blue-100 mt-3 text-lg">
  Analytics overview across all cities
</p>
        </div>

      </div>

      <div style={{ width: "100%", height: 500 }}>

        <ResponsiveContainer>

          <BarChart
            data={chartData}
            barCategoryGap="30%"
          >

            <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.15)"
/>

           <XAxis
           dataKey="name"
           tick={{ fill: "#ffffff", fontSize: 14 }}
/>

            <YAxis
            tick={{ fill: "#ffffff", fontSize: 14 }}
/>

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#4f46e5"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Charts;