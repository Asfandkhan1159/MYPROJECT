// MiniTable.jsx
import { useContext } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow, Card,CardContent, Typography, Box } from "@mui/material";
import { useInventoryData } from "./InventoryDataContext";

export const MiniTable = () => {
    const { rows } = useInventoryData(); 
  console.log(rows)

  return (
    <Card sx={{maxHeight:"250px"}}>
      <Box sx={{padding:"1.8rem"}}>
      <Typography variant="body1" color="initial">Low Inventory Items</Typography>
      </Box>
      
      <CardContent>
   
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Customer Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.itemName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </CardContent>
    </Card>
  );
};
