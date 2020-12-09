import * as React from "react";
import { makeStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from "@material-ui/core";
import { Player } from './GroupItem';

interface UserDataState {

}

interface UserDataProps      {
    player: Player
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
    const { player } = props;

    return (
        <div className={classes.root}>
            <Avatar alt={player.name} src={player.picPath} className={classes.large} />
            <Typography variant="overline">{player.name}</Typography>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpeg" /> */}
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpeg" className={classes.large} /> */}
        </div>
    );
}