import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function CustomFooter() {
  return (
    <footer className="hero is-primary" style={{ background: "#14A098" }}>
      <div className="hero-body container">
        <Typography variant="h7">Follow Us</Typography>
        <br />
        <br />
        <TwitterIcon />
        <InstagramIcon />
        <LinkedInIcon />
        <FacebookIcon />
      </div>
      <Copyright />
    </footer>
  );
}
