import React from 'react';
import Typography from '@mui/material/Typography';
import CostIcon from '../../../assets/New folder/Vector.svg'
const Cost = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{display:"flex", backgroundColor:"#FEECE9", width:"51px", height:"51px", marginTop:"20px"}}>
      <img src={CostIcon} alt="" style={{ width: "76.38px", height: "38.95px", alignSelf: "center" }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "1.8rem" }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography color="text.secondary" style={{ color: "#979797", fontFamily: "Poppins", fontWeight: "500", fontSize: "12px", marginTop: "0.8rem" }}>
            Cost
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography color="text.primary" style={{ width: "37px", height: "32px", fontFamily: "Poppins", fontWeight: "600", fontSize: "28px", lineHeight: "31.23px", marginTop: "0.1rem" }}>
          ${Math.floor(Math.random()*500)+10}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Cost;
