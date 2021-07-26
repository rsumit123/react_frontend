import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import RedditIcon from "@material-ui/icons/Reddit";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  image: {
    width: 50,
    height: 50,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  tableHead: {
    backgroundColor: "#627296",
  },
  footer: {
    position: "absolute",

    width: "100%",
    textAlign: "center",
    background: "#14A098",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  footerTextCP: {
    color: "white",
  },
  avatar: {
    backgroundColor: "white",
    border: `1px solid `,
    color: "#14A098",
    justifyContent: "center",
    alignSelf: "center",
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  iconSeparate: {
    paddingRight: 7,
  },
  box: {
    marginBottom: theme.spacing(2),
  },
  footer_div: {
    paddingBottom: "60px",
  },
}));

function getDate() {
  return new Date().getFullYear();
}
function Copyright() {
  const classes = useStyles();
  return (
    <p className={classes.footerTextCP}>
      © Copyright {getDate()}- Company Name. All rights reserved
    </p>
  );
}

export default function CustomFooter() {
  const classes = useStyles();
  return (
    <div className={classes.footer_div}>
      <footer className={classes.footer}>
        <p className={classes.footerText}>Follow Us</p>

        <Box
          className={classes.box}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap="0.5rem"
        >
          <div className={classes.iconSeparate}>
            <Avatar className={classes.avatar}>
              <FacebookIcon fontSize="small" />
            </Avatar>
          </div>
          <div className={classes.iconSeparate}>
            <Avatar className={classes.avatar}>
              <InstagramIcon fontSize="small" />
            </Avatar>
          </div>
          <div className={classes.iconSeparate}>
            <Avatar className={classes.avatar}>
              <LinkedInIcon fontSize="small" />
            </Avatar>
          </div>
          <div className={classes.iconSeparate}>
            <Avatar className={classes.avatar}>
              <TwitterIcon fontSize="small" />
            </Avatar>
          </div>
          <div className={classes.iconSeparate}>
            <Avatar className={classes.avatar}>
              <RedditIcon fontSize="small" />
            </Avatar>
          </div>
        </Box>
        <Copyright className={classes.footerText} />
      </footer>
    </div>
  );
}
