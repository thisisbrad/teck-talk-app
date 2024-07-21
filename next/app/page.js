import { LoadingIcon, MenuButton, Topbar } from "@/components";
import { Category } from "@mui/icons-material";
import { Button, ListItemIcon, ListItemText, MenuItem, Paper, Stack, Toolbar, Typography } from "@mui/material";
//import Image from "next/image";
//import styles from "./page.module.css";

export default function Home() {
  return (<>
  <Topbar>
    <Typography variant="h4">Tech Talk</Typography>
    <Toolbar disableGutters>
      <Button component="a" color="inherit" href="/login">Login</Button>
    </Toolbar>
  </Topbar>
  <Paper component="main" sx={{m:1, p:1}}>
    <Stack justifyContent="center" alignItems="center">
      <LoadingIcon {...{
        stroke:"primary.main",
        sx:{
          width: '10rem', 
          height: '10rem'
        }}}/>
    </Stack>
  </Paper>
  </>);
}
