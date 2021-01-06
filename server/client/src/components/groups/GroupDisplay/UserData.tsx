import * as React from "react";
import { makeStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from "@material-ui/core";


interface UserDataState {

}

interface UserDataProps      {
    picPath: string,
    name: string
}

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        fontFamily: "Assitant"
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));



export default function UserData(props: UserDataProps, state: UserDataState) {
    const classes = styles();
    const { name, picPath } = props;

    return (
        <div className={classes.root}>
            <Avatar alt={name} src={picPath} className={classes.large} />
            <Typography variant="overline">{name}</Typography>
        </div>
    );
}