import React from "react";
import { MoonLoader } from "react-spinners";
import { Box } from "@mui/material";

const Loading = () => {
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#fff",
  };
  return (
    <>
    
    <Box sx={{width:"100%", height:"100vh", display: "flex", justifyContent:"center", alignItems:"center"}}>
        <MoonLoader
          color="blue"
          loading={true}
          size={40}
          cssOverride={CSSProperties}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
     </Box>
    </>
  );
};

export default Loading;
