import { Card, Title, DonutChart } from "@tremor/react";
import * as React from "react"
import TextField from '@mui/material/TextField';
const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

 const Pie = () => {
  const [variable, setVariable] = React.useState("org")
  const variables = ["org", "certification"]
  return (
  <Card className="h-full">
    <div style= {{display:"flex"}}>
    <Title style ={{width:"20%"}}>Distribution of {variable}</Title>
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
    
    <DonutChart
      className="mt-6"
      data={cities}
      category="sales"
      index="name"
      valueFormatter={valueFormatter}
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
    />
  </Card>
)};
export default Pie