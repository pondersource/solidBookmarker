import { useSession } from "@inrupt/solid-ui-react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallBack: FC<{}> = ({ }) => {
  const navigate = useNavigate()

  const { session: { info: { isLoggedIn, webId } } } = useSession();

  // useEffect(() => {
  //   onSessionRestore((url) => {
  //     console.log("onSessionRestore");
      
  //     navigate(url, { replace: true });
  //   });
  //   Auth.completeLogin();
  // }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  }, [isLoggedIn])
  
  return (
    <Box>
      {!isLoggedIn && <>
        <Typography>Redirecting</Typography>
        <Typography>webId: {webId}</Typography>
        <LinearProgress color="inherit" />
      </>}
      {/* {isLoggedIn && <Navigate to={"/"} />} */}
    </Box>
  );
};

export default LoginCallBack;