import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Hidden } from "@material-ui/core";
import { motion } from "framer-motion";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    textAlign: "left",
    width: `calc(100% - ${theme.spacing(18)}px)`,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      textAlign: "center",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.grey[300],
    borderColor: theme.palette.grey.A100,
    color: theme.palette.grey[700],
  },
  appBarShift: {
    width: `calc(100% - 240px)`,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  link: {
    display: "inline-block",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textDecoration: "none",
    color: theme.palette.secondary.dark,
  },
  rigthContent: {
    display: "flex",
    fontSize: theme.typography.caption.fontSize,
  },
  heart: {
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    margin: `0 ${theme.spacing(1)}px`,
  },
  text: {
    marginLeft: theme.spacing(1),
  },
  underline: {
    textDecoration: "underline",
  },
  hover: {
    cursor: "pointer",
  },
}));

function Footer({ open, setOpen, ...props }) {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);

  const vars = {
    animate: {
      scale: [1, 1.2, 1],
    },
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      loop: Infinity,
    },
  };

  const handleChangeAnimation = () => setAnimate(!animate);

  const Heart = () => {
    return (
      <motion.div
        className={classes.heart}
        transition={vars.transition}
        animate={animate ? vars.animate : {}}
      >
        <Icon className={classes.heart} color={animate ? "error" : "inherit"}>
          {animate ? "favorite" : "favorite_border"}
        </Icon>
      </motion.div>
    );
  };

  return (
    <Box
      component="footer"
      className={clsx(classes.footer, {
        [classes.appBarShift]: open,
      })}
      paddingX={5}
      paddingY={2.5}
      borderTop={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Typography variant="caption">
        © 2020 - Centro Integrado de Saúde
        <a
          href="https://uniamerica.br/"
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Uniamérica
        </a>
        - Todos os direitos reservados.
      </Typography>
      <Hidden xsDown>
        <Box
          className={clsx(classes.rigthContent, {
            [classes.hover]: animate,
          })}
          onMouseEnter={handleChangeAnimation}
          onMouseLeave={handleChangeAnimation}
        >
          Feito com
          <Heart />
          por
          <strong
            className={clsx(classes.text, {
              [classes.underline]: animate,
            })}
          >
            Engenharia de Software
          </strong>
        </Box>
      </Hidden>
    </Box>
  );
}

export default Footer;
