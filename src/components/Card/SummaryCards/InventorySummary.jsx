import {React} from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/joy/Typography'
import Box from '@mui/material/Box'
import Icon from '../../../assets/Icon.png'


const InventorySummary = (props) => {
  return (
    <div>
      <Paper variant="elevation" elevation={2} sx={{height:"251px", width:"364px", padding:"1rem"}}>
        <Typography level="h4" color="initial">{props.heading}</Typography>
        <Box sx={{display:'flex',flexDirection:"row", alignItems:"end", justifyContent:"center"}}>
        <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"#F8F8F8", border:"0.86px", width:"140.11px", height:"auto", alignItems:"start", justifyContent:"start", padding:"2rem", margin:"20px"}}>
       
              <img src={props.icon1} alt="" style={{ width: '47.38px', height: '47.95px', alignSelf: 'center' }} />
         
        <Typography  level='body-xs' color="initial" sx={{alignSelf:"center", width:"100px", fontSize:"12px", my:"8px"}}>{props.text}</Typography>
        <Typography variant="h6" color="initial" sx={{alignSelf:"center"}}>{props.value}</Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"#F8F8F8", border:"0.86px", width:"140.11px", height:"auto", alignItems:"start", justifyContent:"start", padding:"2rem", margin:"20px"}}>
        <img src={props.icon2} alt="" style={{ width: "47.38px", height: "47.95px", alignSelf: "center" }} />
        <Typography level='body-xs' color="initial" sx={{alignSelf:"center", width:"100px", fontSize:"12px", my:"6px"}}>{props.text2}</Typography>
        <Typography variant="h6" color="initial" sx={{alignSelf:"center"}}>{props.value2}</Typography>
        </Box>
        </Box>
      </Paper>
    </div>
  )
}

export default InventorySummary
