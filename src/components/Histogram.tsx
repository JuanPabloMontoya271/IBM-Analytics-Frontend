import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import TextField from "@mui/material/TextField";
import * as React from "react";

const Histogram = () => {
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
    fetch(`/api/barlist/${variable}`, { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        setCategory(data.columns);
        setChartData(data.data);
      });
  };
  React.useEffect(() => {
    const headers = {
      "Content-Type": "application/json", // Replace with the appropriate content type
    };
    fetch("/api/barlist/org", { method: "GET" })
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
      <Flex className="mt-4">
        <Text>
          <Bold>Source</Bold>
        </Text>
        <Text>
          <Bold>Visits</Bold>
        </Text>
      </Flex>
      <BarList data={chartData} className="mt-2" />
    </Card>
  );
};
export default Histogram;
