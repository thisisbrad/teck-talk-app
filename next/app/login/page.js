import { AuthCard, LoadingIcon, MenuButton, Topbar } from "@/components";
import { useBool } from "@/hooks";
import { Category } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, DialogTitle, ListItemIcon, ListItemText, MenuItem, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";
//import Image from "next/image";
//import styles from "./page.module.css";

export default function Home() {
  console.log(useBool);
  return (<>
  <Topbar>
    <Typography variant="h4">Tech Talk | Login</Typography>
    <Toolbar disableGutters>
      <MenuButton title="Foo" buttonProps={{color: 'inherit'}}>
        <MenuItem>
          <ListItemIcon><Category/></ListItemIcon>
          <ListItemText primary="Bar"/>
        </MenuItem>
      </MenuButton>
    </Toolbar>
  </Topbar>
  <Stack alignItems="center" sx={{m:1}}>
      <AuthCard/>
  </Stack>
  </>);
}
