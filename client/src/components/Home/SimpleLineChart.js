import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import LineChart from "recharts/lib/chart/LineChart";
import Line from "recharts/lib/cartesian/Line";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";
import Axios from 'axios';

export default class SimpleLineChart extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      client_orders: []
    };
  }

  async componentDidMount() {
    let data = await Axios.get('/api/home_page/getLineChartData');
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

  render(){
    return(
      //Chart will change the Y scale based on the data given.
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={this.state.client_orders}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Orders"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
