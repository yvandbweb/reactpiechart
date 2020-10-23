import React, { useState, useEffect,Component  } from 'react';
import { render } from "react-dom";
import { VictoryPie } from "victory-pie";
import {
  PieChart, Pie, Sector, Cell,Legend,ResponsiveContainer
} from 'recharts';




const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PieChart1 extends Component {
    
    constructor(props) {
      super(props);
    }              
    
 render() {
    return (
            <div id="pies">        
            <ResponsiveContainer className="container55454" width="100%" height={500} >                
      <PieChart>
        <Pie dataKey="value" 
        isAnimationActive={false} 
        data={this.props.data} 
      
        fill="#8884d8" 
          labelLine={false}
          label={renderCustomizedLabel} 
        width={550} height={550}
        >
          {
            this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.props.colorScale[index % this.props.colorScale.length]} />)
          }
          </Pie>
        <Legend verticalAlign="top" height={36}/>
      </PieChart>
      </ResponsiveContainer>      
      </div>
    );
  }
}    
export default PieChart1;
