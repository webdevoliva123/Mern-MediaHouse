import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
const Loader = () => {

    const showLoader = useSelector((state) => state.getLoader.showLoader);

  return (
    <div className="center-row" style={showLoader === true ? { background: "black", position:"fixed",top:"0",left:"0",zIndex:"10000"} : {display : "none"} }>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          width={"100vw"}
          height={"7vh"}
        />
        
        <Skeleton
          variant="rectangular"
          width={"100vw"}
          height={"70vh"}
          sx={{ bgcolor: "grey.700" }}
        />

        <Grid container spacing={2}>
          <Grid item md={12}>
            <Skeleton
              variant="text"
              sx={{ bgcolor: "grey.700" }}
              width={"11vw"}
              height={"7vh"}
            />
          </Grid>
          <Grid item md={3}>
            <Skeleton
              variant="rectangular"
              width={"21vw"}
              height={"20vh"}
              sx={{ bgcolor: "grey.700" }}

              style={{borderRadius:"10px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}
            />
          </Grid>
          <Grid item md={3}>
            <Skeleton
              variant="rectangular"
              width={"21vw"}
              height={"20vh"}
              sx={{ bgcolor: "grey.700" }}

              style={{borderRadius:"10px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}
            />
          </Grid>
          <Grid item md={3}>
            <Skeleton
              variant="rectangular"
              width={"21vw"}
              height={"20vh"}
              sx={{ bgcolor: "grey.700" }}

              style={{borderRadius:"10px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}
            />
          </Grid>
          <Grid item md={3}>
            <Skeleton
              variant="rectangular"
              width={"21vw"}
              height={"20vh"}
              sx={{ bgcolor: "grey.700" }}
              
              style={{borderRadius:"10px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}
            />
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default Loader;