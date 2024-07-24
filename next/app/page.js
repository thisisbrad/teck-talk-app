import { LoadingIcon, MenuButton, Topbar } from "@/components";
import { Category } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem, Paper, Stack, Toolbar, Typography } from "@mui/material";
//import Image from "next/image";
//import styles from "./page.module.css";

export default function Home() {
  return (<>
  <Topbar>
    <Typography variant="h4">Tech Talk</Typography>
    <Toolbar disableGutters>
      <MenuButton title="Foo" buttonProps={{color: 'inherit'}}>
        <MenuItem>
          <ListItemIcon><Category/></ListItemIcon>
          <ListItemText primary="Bar"/>
        </MenuItem>
      </MenuButton>
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
