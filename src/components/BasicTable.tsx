import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';


export default function BasicTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns_, setColumns_] = React.useState([]);
  const [rows_, setRows_] = React.useState([{}]);
  const [query, setQuery] = React.useState("")
  const [mode, setMode] = React.useState("")
  const modes = ["Query", "Q/A"]
  

  const executeQuery = ()=>{
    console.log(query)
    const body = JSON.stringify({prompt:query})
    const headers = {
      'Content-Type': 'application/json', // Replace with the appropriate content type
    }
    fetch("/api/query", {method: "POST", headers: headers, body: body, } )
    .then((data) => data.json())
    .then((data) => {
      console.log(data)
      const query = data.query
      const columns = data.columns;
      const rows = data.rows;
      console.log(columns, rows );
      setColumns_(columns);

      setRows_(rows);
    })
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    const body = JSON.stringify({prompt: ""})
    const headers = {
      'Content-Type': 'application/json', // Replace with the appropriate content type
    }
    fetch("/api/query", {method: "POST", headers: headers , body: body} )
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        const query = data.query
        const columns = data.columns;
        const rows = data.rows;
        console.log(columns, rows );
        setColumns_(columns);

        setRows_(rows);
      })
  }, [])

  return (
    
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style = {{"padding": "5px", marginTop:"10px", display:"flex", height:"30%"}}>
        <TextField
          id="standard-multiline-static"
          label="Query"
          value = {query}
          multiline
          rows={3}
          sx = {{width:"70%"}}
          onChange = {(evt) =>{
            setQuery(evt.target.value)
          }}
        />
        <div style = {{width:"30%", marginLeft:"5px", height:"100%" }}>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Mode"
          defaultValue="Query"
          SelectProps={{
            native: true,
          }}
          
          sx = {{width:"100%"}}
          onChange={(evt)=>{
            setMode(evt.target.value)
          }}
        >
          {modes.map((option, key) => (
            <option key={key} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <div>
          <div style={{marginTop:"5px", width:"100%"}}>
        <Button variant="outlined" 
                sx = {{width:"50%"}}
                onClick = {(evt)=>{
                  setQuery("")
                }}>Clear</Button>
        <Button variant="outlined"
                sx = {{width:"50%"}}
                onClick = {(evt)=>{
                  executeQuery()
                }} >Submit</Button>
        </div>
        </div>
        
        </div>
        </div>

       
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns_.map((column, key) => (
                <TableCell
                  key={key}
                  align={"center"}
                  style={{ minWidth: 100 }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows_
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                    {columns_.map((elem, key) => {
                      const value = row[elem];
                      return (
                        <TableCell key={key} align={"center"}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows_.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}