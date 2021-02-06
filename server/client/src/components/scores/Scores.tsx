import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        fontFamily: theme.typography.fontFamily,
    },
    container: {
        maxHeight: '100%',
    },
}));

const Scores = () => {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            Scores Page
        </div>
    );
};

export default Scores;