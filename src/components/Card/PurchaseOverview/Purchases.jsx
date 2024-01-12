import React from 'react';
import Typography from '@mui/material/Typography';
import PurchasesIcon from '../../../assets/New folder/Group 1000002789.svg'
const Purchases = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{display:"flex", backgroundColor:"#FEECE9", width:"51px", height:"51px", marginTop:"10px"}}>
      <img src={PurchasesIcon} alt="" style={{ width: "76.38px", height: "38.95px", alignSelf: "center" }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "1.8rem" }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography color="text.secondary" style={{ color: "#979797", fontFamily: "Poppins", fontWeight: "500", fontSize: "12px", marginTop: "0.8rem" }}>
            No. of Purchases
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap' }}>
          <Typography color="text.primary" style={{ width: "37px", height: "32px", fontFamily: "Poppins", fontWeight: "600", fontSize: "28px", lineHeight: "31.23px", marginTop: "0.1rem" }}>
            507
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Purchases;
