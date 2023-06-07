import { Card, Title, AreaChart } from "@tremor/react";
import * as React from "react"
import TextField from '@mui/material/TextField';
const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

 const Chart = ()=>{
  const [variable, setVariable] = React.useState("org")
  const variables = ["org", "certification"]
 
 return (
  <Card>
    <div style= {{display:"flex"}}>
    <Title style ={{width:"20%"}}> Distribution of {variable} over time</Title>
    <TextField
          id="outlined-select-currency-native"
          select
          label="Mode"
          defaultValue="Query"
          SelectProps={{
            native: true,
          }}
          
          sx = {{width:"40%", marginLeft: "40%"}}
          onChange={(evt)=>{
            setVariable(evt.target.value)
          }}
        >
          {variables.map((option, key) => (
            <option key={key} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        </div>
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["SemiAnalysis", "The Pragmatic Engineer"]}
      colors={["indigo", "cyan"]}
      valueFormatter={dataFormatter}
    />
  </Card>
)};
export default Chart