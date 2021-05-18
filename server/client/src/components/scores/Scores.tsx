import {createStyles, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ScoreDisplay from "./ScoreDisplay";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

const padding = 20;

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: '100%',
        fontFamily: theme.typography.fontFamily,
        textAlign: 'center'
    },
    title: {
        fontFamily: theme.typography.fontFamily,
        color: '#ffffff',
        height: '105px',
        alignItems: 'center',
        fontSize: '50px',
        display: 'grid',
    },
    container: {
        maxHeight: '100%',
    },
    select: {
        width: '150px',
        color: 'white',
        fontSize: 'large'
    },
    groupCard: {
        height: `${window.innerHeight - 80}px`,
        spacing: 0,
        padding: 12,
        flexDirection: 'column',
    },
    detailsCard: {
        padding: `${padding}px`,
        height: `${window.innerHeight - 80 - (padding * 2)}px`,
        overflowY: "auto"
    },
    scoresTable: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        flip: false,
        marginTop: 24,
    },
    scoreDay: {
        marginTop: 12,
    }
}));

const Scores = () => {
    const classes = useStyles();
    const [groupsData, setGroupsData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupBets, setGroupBets] = useState({} as { bets: any, games: any });

    useEffect(() => {
        const allGroupsPromise = async () => {
            const groupsData = await axios(
                '/api/groups/all',
            );
            setGroupsData(groupsData.data);
        }
        allGroupsPromise()
    }, []);

    const fetchGroupBets = async (groupId: string) => {
        const betsData = await axios.get(`/api/bets/${groupId}`)

        const { bets, games } = betsData?.data
        const groupedByDate = bets?.reduce((acc, cur) => {
            if (acc[cur.date]) {
                acc[cur.date].push(cur);
            } else {
                acc[cur.date] = [cur];
            }
            return {...acc};
        }, {})

        setGroupBets({ bets: groupedByDate, games });
    }

    const handleSelect = (event: any) => {
        setSelectedGroup(groupsData.find(g => g._id === event.target.value));
        fetchGroupBets(event.target.value);
    }

    const renderSelector = () => {
        return (
            <Select
                className={classes.select}
                onChange={handleSelect}
                id="standard-basic"
            >
                { groupsData.map(({ _id, name}) => {
                    return (
                        <MenuItem value={_id}>{name}</MenuItem>
                    )
                }) }
            </Select>
        );
    };

    const renderGroupDetails = () => {
        const dates = Object.keys(groupBets.bets || {});
        return (
            <div className={classes.scoresTable}>
                {
                    dates.length ? dates.map(date => {
                        return (
                            <div className={classes.scoreDay}>
                                {/* <Typography variant="h5">{new Date(date).toDateString()}</Typography> */}
                                {
                                    groupBets.bets[date]?.length && groupBets.bets[date]?.map(bet => {
                                    return (
                                        <ScoreDisplay bet={bet} games={groupBets.games}/>
                                    )
                                })}
                            </div>
                        )
                    }) : <Typography variant="h5">No bets for this group</Typography>
                }
            </div>
        );
    }

    const renderLayout = () => {
        return (
            <>
            <div className={classes.title}>Bets</div>
            <div>
                <div>
                    {renderSelector()}
                    <Typography style={{paddingBottom:'20px', color:'gray'}}>
                        {selectedGroup?.name || "Select a group"}
                    </Typography>
                </div>
                <div>
                    {renderGroupDetails()}
                </div>
            </div>
            </>
            // <Grid container spacing={1} alignItems="stretch">
            //     <Grid item lg={2} xl={2}>
            //         <Card className={classes.groupCard}>
            //             {renderSelector()}
            //         </Card>
            //     </Grid>
            //     <Grid item lg={10} xl={10}>
            //         <Card className={classes.detailsCard}>
            //             <Typography variant="h2">Bets</Typography>
            //             <Typography variant="h3" color="textSecondary">{selectedGroup?.name || "Select a group"}</Typography>
            //             {renderGroupDetails()}
            //         </Card>
            //     </Grid>
            // </Grid>
        )
    }

    return (
        <div className={classes.root}>
            {renderLayout()}
        </div>
    )
};

export default Scores;