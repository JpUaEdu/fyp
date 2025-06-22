import React from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
 
// Refined color palette
const COLORS = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2"];
 
// Pie Chart with labels
export const EngagementPieChart = ({ data }) => {
  const pieData = data && data.length === 3
    ? [
        { name: "Positive", value: data[0] },
        { name: "Neutral", value: data[1] },
        { name: "Negative", value: data[2] }
      ]
    : [];
 
  const total = pieData.reduce((sum, d) => sum + d.value, 0);
 
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label={({ name, value }) =>
            total
              ? `${name}: ${(value / total * 100).toFixed(1)}%`
              : ""
          }
          labelLine={false}
        >
          {pieData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) =>
          [`${value.toFixed(3)}`, name]
        } />
      </PieChart>
    </ResponsiveContainer>
  );
};
 
// Bar Chart remains the same
export const EngagementBarChart = ({ data }) => {
  const barData = data
    ? [
        {
          name: "Engagement",
          Likes: data.likes,
          Comments: data.replies,
          Retweets: data.retweets,
          Followers: data.followerGrowth
        }
      ]
    : [];
 
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Likes" fill={COLORS[0]} />
        <Bar dataKey="Comments" fill={COLORS[1]} />
        <Bar dataKey="Retweets" fill={COLORS[2]} />
        <Bar dataKey="Followers" fill={COLORS[3]} />
      </BarChart>
    </ResponsiveContainer>
  );
};