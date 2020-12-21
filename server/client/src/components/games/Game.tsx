import { makeStyles } from "@material-ui/core";
import * as React from "react";

interface GameDataState {

}

interface GameDataProps {
   
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

export default function Games(props: GameDataProps, state: GameDataState) {
    const classes = useStyles();

    const {  } = props;

    return (
        <div></div>
    );
};