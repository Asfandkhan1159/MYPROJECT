// MiniTable.jsx
import { useContext } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow, Card,CardContent,  Box,useTheme, useMediaQuery } from "@mui/material";
import { useInventoryData } from "./InventoryDataContext";
import Typography from '@mui/joy/Typography'
export const MiniTable = () => {
    const { rows } = useInventoryData(); 
  console.log(rows)
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card sx={{maxHeight: smScreen ? "400px" :"292px", width: smScreen ? "200px" : "100%"}}>
      <Box sx={{padding:"1rem"}}>
      <Typography level="h4" color="initial">
          Low Inventory Items
        </Typography>
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
