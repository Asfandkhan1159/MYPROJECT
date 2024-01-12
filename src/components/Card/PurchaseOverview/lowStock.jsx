import React from 'react';
import Typography from '@mui/material/Typography';
import lowStockImage from '../../../assets/New folder/Group.svg'
const LowStock = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
         <div style={{display:"flex", backgroundColor:"#FEECE9", width:"51px", height:"51px", marginTop:"10px"}}>
      <img src={lowStockImage} alt="" style={{ width: "76.38px", height: "38.95px", alignSelf: "center" }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "1.8rem" }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography color="text.secondary" style={{ color: "#979797", fontFamily: "Poppins", fontWeight: "500", fontSize: "12px", marginTop: "0.8rem" }}>
            Low Stock Items
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row',  whiteSpace: 'nowrap' }}>
          <Typography color="text.primary" style={{ width: "37px", height: "32px", fontFamily: "Poppins", fontWeight: "600", fontSize: "28px", lineHeight: "31.23px", marginTop: "0.1rem" }}>
            {Math.floor(Math.random()*500)+10}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default LowStock;
