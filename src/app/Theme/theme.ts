import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    incrementDecrement: true;
    cart:true;
    skip:true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'VazirMatn',
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px', // Adds spacing between child elements
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        gutters: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap:'20px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        multiline: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '5px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          direction: 'rtl',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '30px',
          width:'90vw',
          minWidth:'100px',
        },
      },
    },
      MuiButtonGroup: {
        styleOverrides: {
          root:{
            position:'relative',
            backgroundColor:'var(--secondary-color)',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            gap:'60px',
            borderRadius:'8px',
          }
        }
      },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "var(--secondary-color)", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary-color)", // Border color on focus
            },
          },
          "& .MuiInputLabel-root": {
          
            direction: "rtl",
            textAlign: "right",
            left:0,
            right:30,
            color: "gray", // Default label color
            "&.Mui-focused": {
              direction:'rtl',
              color: "var(--primary-color)", // Label color on focus
            },
            "&:Mui-hover": {
              color: "var(--secondary-color)", // Label color on hover
            },
          },
          "& .MuiInputLabel-shrink": {
            transformOrigin: "top right",
          },
          "& .MuiInputBase-input": {
            direction: "rtl",
            textAlign: "right",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          '& legend': {
            // Ensure the legend text is aligned right
            textAlign: 'right', // Align legend text to the right
            direction: 'rtl', // Force RTL direction in legend
          },
          '& span': {
            textAlign: 'right', // Align span inside legend to the right
            direction: 'rtl', // Ensure span follows the RTL direction
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--primary-color)",
          color: "white",
          borderRadius: "8px",
          padding: "10px 20px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "var(--secondary-color)"
          }
        }
      },
      variants: [
        {
          props: { variant: 'skip' }, 
          style: {
            backgroundColor: "transparent",
            color:"var(--primary-color)",
            border:"2px solid var(--primary-color)"
          },
        },
        {
          props: { variant: 'incrementDecrement' }, 
          style: {
            fontSize:'20px'
          },
        },
        {
          props: { variant: 'cart' }, 
          style: {
            fontSize:'20px',
            width: '50px',
            height: '50px',
            minWidth: '50px',
            borderRadius: '50%',
          },
        },
      ],
      
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          backgroundColor: 'var(--primary-color)', // Thumb color
          width: 24,
          height: 24,
          border: 'none',
          boxShadow: 'none', // Removes any visual artifact around the thumb
          '&:hover': {
            boxShadow: '0 0 10px var(--secondary-color)', // Add hover glow
          },
          '&:focus': {
            outline: 'none', // Removes blue outline during focus
          },
          '&:active': {
            boxShadow: '0 0 15px var(--secondary-color)', // Active interaction glow
          },
          '&:before': {
            boxShadow: 'none', // Removes the inner white dot entirely
          },
        },
        track: {
          backgroundColor: 'var(--primary-color)',
          height: 8,
          borderRadius: 4,
          border:'none'
        },
        rail: {
          backgroundColor: 'var(--secondary-color)',
          opacity: 0.5,
          height: 8,
          borderRadius: 4,
          border:'none'
        },
        mark: {
          color: 'transparent', // Hides the default marks
        },
        markLabel: {
          color: '#000', // You can customize this if needed
        },
        valueLabel: {
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          fontSize: '12px',
          borderRadius: '50%',
          top: -10,
        },
      },
    },
  },
});
export default theme;
