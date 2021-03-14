import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

interface StatisticsState {

}

interface StatisticsProps {
   
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        fontFamily: theme.typography.fontFamily,
    },
    container: {
        maxHeight: '100%',
    },
}));

export default function Statistics(props: StatisticsProps, state: StatisticsState) {
    const classes = useStyles();

    const { } = props;

    return (
        <div style={{height: "800px"}} className={classes.root}>
            <iframe src="http://localhost:4200" style={{border:"none", width:"100%", height:"100%"}}></iframe>
        </div>
    );
};