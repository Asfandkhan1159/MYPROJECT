import { useTheme, useMediaQuery } from '@mui/material';

const useResponsiveStyles = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getResponsiveStyles = () => ({
    display: smScreen ? 'flex' : 'block',
    flexDirection: smScreen ? 'row' : 'column',
    justifyContent: smScreen ? 'space-between' : 'start',
    alignItems: smScreen ? 'center' : 'start',
   
    
  });

  return { smScreen, getResponsiveStyles };
};

export default useResponsiveStyles;
