import { Container, createTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import UserSidebar from "../auth/UserSidebar";
import { CryptoState } from "../CryptoContex";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const { currency, setCurrency, user } = CryptoState();
  console.log(currency);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => history.push(`/`)}
                className={classes.title}
                variant="h6"
              >
                Crypto Hunter
              </Typography>
              <Select
                variant="outlined"
                style={{ width: 100, height: 40, marginLeft: 15 }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"ILS"}>ILS</MenuItem>
              </Select>

              {user ? <UserSidebar /> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
