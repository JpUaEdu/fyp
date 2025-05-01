import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const pieData = [
  { name: "Likes", value: 5230 },
  { name: "Comments", value: 1145 },
  { name: "Retweets", value: 890 },
  { name: "Follower Growth", value: 1200 }
];

const barData = [
  { name: "Engagement", Likes: 5230, Comments: 1145, Retweets: 890, Followers: 1200 }
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61"];

export const EngagementPieChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export const EngagementBarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Likes" fill="#8884d8" />
      <Bar dataKey="Comments" fill="#82ca9d" />
      <Bar dataKey="Retweets" fill="#ffc658" />
      <Bar dataKey="Followers" fill="#ff6f61" />
    </BarChart>
  </ResponsiveContainer>
);
