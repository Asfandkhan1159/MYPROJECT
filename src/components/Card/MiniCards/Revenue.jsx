// MiniCard (Child)
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MiniCard = (props) => {
  const cardStyle = {
    width: 77,
    height: "129px",
    display: "flex",
    flexDirection: 'row',
    boxShadow: "none",
    borderRadius: "10px",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: 'row',
    backgroundColor: props.backgroundColor, // Apply background color here
  };
 console.log(props.backgroundColor)
  return (
    <div>
      <Card sx={{contentStyle, width:"auto"}}>
        <CardContent sx={contentStyle}>
          <img src={props.image} alt="" style={{ width: "76.38px", height: "38.95px", alignSelf: "center" }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "1.8rem" }}>
            <Typography color="text.secondary" style={{ color: "#979797", fontFamily: "Poppins", fontWeight: "500", fontSize: "15px", marginTop: "0.8rem" }}>
              {props.title}
            </Typography>
            <Typography color="text.primary" style={{ width: "37px", height: "32px", fontFamily: "Poppins", fontWeight: "600", fontSize: "28px", lineHeight: "31.23px", marginTop: "0.1rem" }}>
              {props.value}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniCard;
