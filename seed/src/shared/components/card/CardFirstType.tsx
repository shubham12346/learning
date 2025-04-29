import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
 
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Card from './Card';

export default function MediaControlCard({color}) {

  return (
    <Card>
       <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderLeft: `5px solid ${color}`,
          borderRadius: '10px',
        }}
      
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <div style={{ display: "flex" }}>
            <CalendarMonthIcon />
            <div style={{ margin: "10px", display: "flex" }}>
              <Typography style={{ lineHeight: 0.5 }} variant="h6">
                Due Date :
              </Typography>
              <Typography
                style={{ lineHeight: 0.5 }}
                variant="h6"
                color={'red'}
              >
                {" "}
                July 2nd{" "}
              </Typography>
            </div>
          </div>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Get leadership sign off on final proposal for Regulation S-P.
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
