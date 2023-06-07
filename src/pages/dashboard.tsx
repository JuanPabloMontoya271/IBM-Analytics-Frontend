



import { useState } from "react";
import { Card, Grid, Tab, TabList, Text, Title, Flex } from "@tremor/react";
// import  DataFrame  from  "../components/dataframe"
import BasicTable from "@/components/BasicTable";
import Chart from "../components/Chart"
import Pie from "../components/Pie"
import Histogram from "../components/Histogram"
export default function KpiCardGrid() {
  const [selectedView, setSelectedView] = useState("1");
  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Title>Dashboard</Title>
      <Text>IBM Analytics Software</Text>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Overview" />
        <Tab value="2" text="Detail" />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numCols={3}  className="mt-6 gap-6 w-full">
            <Card className="w-auto">
             <Chart/>
            </Card >
            <Card className="w-auto">
              <Pie/>
            </Card>
            <Card className="w-auto">
              <Histogram/>
            </Card>
      
       
          </Grid>

          <div className="mt-6">
            <Card>
              <BasicTable/>  
            </Card>
          </div>
        </>
      ) : (
        <Card className="mt-6">
          <div className="h-96" />
        </Card>
      )}
    </main>
  );
}

