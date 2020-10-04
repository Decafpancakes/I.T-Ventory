import React, { PureComponent } from 'react';
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Client A', Orders: 2, amt: 2400,
  },
  {
    name: 'Client B',  Orders: 5, amt: 2210,
  },
  {
    name: 'Client C',  Orders: 9, amt: 2290,
  },
  {
    name: 'Client D',  Orders: 4, amt: 2000,
  },
  {
    name: 'Client E',  Orders: 1, amt: 2181,
  },
  {
    name: 'Client F', Orders: 4, amt: 2500,
  },
  {
    name: 'Client G', Orders: 7, amt: 2100,
  },
];

export default class SimpleLineChart extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="99%" height={320}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Orders" fill="#2481ba" />
      </BarChart>
      </ResponsiveContainer>
    );
  }
}