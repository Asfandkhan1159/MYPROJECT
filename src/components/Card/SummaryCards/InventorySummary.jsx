import {React} from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/joy/Typography'
import Box from '@mui/material/Box'
import Icon from '../../../assets/Icon.png'
import Grid from '@mui/material/Grid'
import { useTheme, useMediaQuery } from '@mui/material'

const InventorySummary = (props) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <div>
      <Paper variant="elevation" elevation={2} sx={{ height: "auto", width: smScreen ? "65%" :"100%", padding: "1rem" }}>
        <Typography level="h4" color="initial" sx={{ marginBottom: "1rem" }}>
          {props.heading}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F8F8F8",
                border: "0.86px",
                width: "100%",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                marginBottom: "20px",
              }}
            >
              <img src={props.icon1} alt="" style={{ width: "47.38px", height: "47.95px" }} />
              <Typography level="body-xs" color="initial" sx={{ width: "100%", fontSize: "12px", my: "8px", textAlign: "center" }}>
                {props.text}
              </Typography>
              <Typography variant="h6" color="initial" sx={{ alignSelf: "center" }}>
                {props.value}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F8F8F8",
                border: "0.86px",
                width: "100%",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                marginBottom: "20px",
              }}
            >
              <img src={props.icon2} alt="" style={{ width: "47.38px", height: "47.95px" }} />
              <Typography level="body-xs" color="initial" sx={{ width: "100%", fontSize: "12px", my: "6px", textAlign: "center" }}>
                {props.text2}
              </Typography>
              <Typography variant="h6" color="initial" sx={{ alignSelf: "center" }}>
                {props.value2}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default InventorySummary;