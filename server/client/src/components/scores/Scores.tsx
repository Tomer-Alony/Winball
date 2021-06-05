import {createStyles, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ScoreDisplay from "./ScoreDisplay";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    const [groupBets, setGroupBets] = useState({ bets: [], games: []} as { bets: any, games: any });
    const [page, setPage] = useState(0);

    useEffect(() => {
        const allGroupsPromise = async () => {
            const groupsData = await axios(
                '/api/groups/all',
            );
            setGroupsData(groupsData.data);
        }
        allGroupsPromise()
    }, []);

    const fetchGroupBets = async (groupId: string, fromPage?: number) => {

        const betsData = await axios.get(`/api/bets/${groupId}/${fromPage !== undefined ? fromPage : page}`)
        const { bets, games } = betsData?.data
        const groupedByDate = bets?.reduce((acc, cur) => {
            if (acc[cur.date]) {
                acc[cur.date].push(cur);
            } else {
                acc[cur.date] = [cur];
            }
            return {...acc};
        }, {})
        setPage(fromPage !== undefined ? fromPage + 1 : page + 1);
        return setGroupBets({bets: {...groupBets.bets, ...groupedByDate}, games: {...groupBets.games, ...games}});
    }

    const handleSelect = async (event: any) => {
        setSelectedGroup(groupsData.find(g => g._id === event.target.value));
        setGroupBets({ bets: [], games: [] });
        await fetchGroupBets(event.target.value, 0);
    }

    const renderSelector = () => {
        return (
            <div style={{alignItems:"center", display:"inline-flex"}}>
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
            <PeopleAltIcon style={{color:'white'}}></PeopleAltIcon>
            </div>
        );
    };

    const fetchNext = async () => {
        console.log("loading")
        if (!selectedGroup?._id) return;
        return await fetchGroupBets(selectedGroup._id);
    }
    const renderGroupDetails = () => {
        const dates = Object.keys(groupBets.bets || {});
        return (
            <div className={classes.scoresTable}>
                <InfiniteScroll
                    hasMore={true}
                    next={fetchNext}
                    loader={<h3>Loading...</h3>}
                    dataLength={groupBets.bets.length}>
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
                        }) : <Typography variant="h5" style={{color:'gray'}}>No bets for this group</Typography>
                    }
                </InfiniteScroll>
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
                    <Typography style={{ color:'gray'}}>
                        {selectedGroup? "" : "Select a group"}
                    </Typography>
                </div>
                <div>
                    {renderGroupDetails()}
                </div>
            </div>
            </>
        )
    }

    return (
        <div className={classes.root}>
            {renderLayout()}
        </div>
    )
};

export default Scores;