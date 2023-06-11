import { Card, Title, DonutChart } from "@tremor/react";
import * as React from "react";
import TextField from "@mui/material/TextField";

const valueFormatter = (number: number) => {
  console.log(number);
  return `${Intl.NumberFormat("us").format(number).toString()}`;
};

const Pie = () => {
  const [variable, setVariable] = React.useState("org");
  const variables = [
    "org",
    "certification",
    "work_location",
    "type",
    "uid",
    "issue_date",
  ];
  const [category, setCategory] = React.useState("");
  const [chartData, setChartData] = React.useState([]);
  const executeQuery = (variable: String) => {
    fetch(`/api/distribution/${variable}`, { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        setCategory(data.category);
        setChartData(data.data);
      });
  };
  React.useEffect(() => {
    const headers = {
      "Content-Type": "application/json", // Replace with the appropriate content type
    };
    fetch("/api/distribution/org", { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        setCategory(data.category);
        setChartData(data.data);
      });
  }, []);
  return (
    <Card className="h-full">
      <div style={{ display: "flex" }}>
        <Title style={{ width: "20%" }}>Distribution of {variable}</Title>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Mode"
          defaultValue="Query"
          SelectProps={{
            native: true,
          }}
          sx={{ width: "40%", marginLeft: "40%" }}
          onChange={(evt) => {
            executeQuery(evt.target.value);
            setVariable(evt.target.value);
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
        data={chartData}
        category="count"
        index={category}
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};
export default Pie;
