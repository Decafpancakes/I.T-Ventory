import React, { PureComponent } from 'react';
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Axios from 'axios';

/* const data = [
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
]; */

export default class SimpleBarChart extends PureComponent {

  constructor(props){
    super(props);
    
    this.state = {
      client_orders: []
    };
  }

  async componentDidMount() {
    let data = await Axios.get('/api/home_page/getBarChartData');
    let array = [];
    data.data.forEach(document => {
      array.push({
        name: document.client_name,
        Orders: document.orders
      });
    });
    this.setState(state => {
      return {
        client_orders: array
      };
    });
  }

  render() {
    return (
      <ResponsiveContainer width="99%" height={320}>
      <BarChart
        width={500}
        height={300}
        data={this.state.client_orders}
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