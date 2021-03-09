import {makeStyles, MenuItem, Select} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        fontFamily: theme.typography.fontFamily,
    },
    container: {
        maxHeight: '100%',
    },
    select: {
        minWidth: 200,
        minHeight: 50
    }
}));

const Scores = () => {
    const classes = useStyles();
    const [groupsData, setGroupsData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

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
        const bets = await axios.get(`/api/bets/${groupId}`)
        console.log(bets.data);
    }

    const handleSelect = (event: any) => {
        setSelectedGroup(event.target.value);
        fetchGroupBets(event.target.value);
    }

    return (
        <div className={ classes.root }>
            Scores Page
            <div>
                {selectedGroup}
            </div>
            <Select
                className={classes.select}
                onChange={handleSelect}
                variant="outlined"
            >
                { groupsData.map(({ _id, name}) => {
                    return (
                        <MenuItem value={_id}>{name}</MenuItem>
                    )
                }) }
            </Select>
        </div>
    );
};

export default Scores;