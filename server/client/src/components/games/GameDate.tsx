import { makeStyles } from "@material-ui/core";
import * as React from "react";
import moment from "moment";

const useStyles = makeStyles(theme => ({

}));

export default function GameDate(props) {
    const { startDate, gamesInDate } = props;
    // debugger
    const date = moment(gamesInDate.startDate).format('D-M-YY');
    return (
        <>
        <div>{date}</div>
        </>
    );
};