import { Card, Title, AreaChart } from "@tremor/react";
import * as React from "react";
// import Plot from "react-plotly.js";
import TextField from "@mui/material/TextField";

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

const Chart = () => {
  const [variable, setVariable] = React.useState("org");
  const [categories, setCategories] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const variables = ["org", "certification"];
  React.useEffect(() => {
    const headers = {
      "Content-Type": "application/json", // Replace with the appropriate content type
    };
    fetch("/api/timeseries", { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        console.log("response", data);
        setCategories(data.columns);
        setChartData(data.data);
      });
  }, []);

  return (
    <Card>
      <div style={{ display: "flex" }}>
        <Title style={{ width: "20%" }}>
          {" "}
          Distribution of {variable} over time
        </Title>
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
      <AreaChart
        className="h-72 mt-4"
        data={chartData}
        index="issue_date"
        categories={categories.slice(0, 3)}
        colors={["indigo", "cyan"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};
export default Chart;
