import { makeStyles } from "@material-ui/core";
import * as React from 'react'

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

const Statistics = (props: StatisticsProps, state: StatisticsState) => {
    const classes = useStyles();

    const { } = props;

    return (
        <div style={{height: "800px"}} className={classes.root}>
            <iframe src="http://localhost:4200" style={{border:"none", width:"100%", height:"100%"}}></iframe>
        </div>
    );
};

export default Statistics;