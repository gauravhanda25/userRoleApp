import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = (props) => {
  const pages = ["Users", "Roles"];
  const location = useLocation();
  const navigate = useNavigate();

  const basicBtnStyle = {
    m: 1,
    display: "block",
    color: "white",
    backgroundColor: "#1976d2",
    ":hover": {
      color: "#1976d2", // theme.palette.primary.main
      bgcolor: "white",
    },
  };

  const selectedBtnStyle = {
    ...basicBtnStyle,
    color: "#1976d2",
    backgroundColor: "white",
  };
  
  return (
    <Container>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography>Assignment</Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/${page.toLowerCase()}`)}
                  sx={
                    location.pathname === `/${page.toLowerCase()}`
                      ? selectedBtnStyle
                      : basicBtnStyle
                  }
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>{props.children}</Box>
    </Container>
  );
};

export default React.memo(Layout);
