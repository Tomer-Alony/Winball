import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import GroupItem from './GroupDisplay/GroupDisplay';
import pic1 from '../../static/images/avatar/1.jpeg';
import pic2 from '../../static/images/avatar/2.jpeg';
import pic3 from '../../static/images/avatar/3.jpeg';
import pic4 from '../../static/images/avatar/4.jpeg';


const groupsfakedata = [
    {
        id: 1,
        name: 'Wallak Pseder',
        description: 'Wallak group',
        playersData: [
            { name: 'Adir Sation', picPath: pic1, id: 1, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Shira Cohen', picPath: pic2, id: 2, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Tomer Alony', picPath: pic3, id: 3, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Yair Vered', picPath: pic4, id: 4, games: 3, side: 1, bullseye: 2, points: 10 }
        ]
    },
    {
        id: 2,
        name: 'LoserTomer',
        description: 'Tomer is the biggst loser',
        playersData: [
            { name: 'Adir Sation', picPath: pic1, id: 1, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Shira Cohen', picPath: pic2, id: 2, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Tomer Alony', picPath: pic3, id: 3, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Yair Vered', picPath: pic4, id: 4, games: 3, side: 1, bullseye: 2, points: 10 }
        ]
    },
    {
        id: 3,
        name: 'ShiraPira',
        description: 'Yalla krayot',
        playersData: [
            { name: 'Adir Sation', picPath: pic1, id: 1, games: 3, side: 1, bullseye: 2, points: 7 },
            { name: 'Shira Cohen', picPath: pic2, id: 2, games: 4, side: 3, bullseye: 4, points: 5 },
            { name: 'Tomer Alony', picPath: pic3, id: 3, games: 5, side: 2, bullseye: 2, points: 5 },
            { name: 'Yair Vered', picPath: pic4, id: 4, games: 6, side: 1, bullseye: 2, points: 10 }
        ]
    },
    {
        id: 4,
        name: 'YakirMakir',
        description: 'Ma kore yair ze yoav',
        playersData: [
            { name: 'Adir Sation', picPath: pic1, id: 1, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Shira Cohen', picPath: pic2, id: 2, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Tomer Alony', picPath: pic3, id: 3, games: 3, side: 1, bullseye: 2, points: 10 },
            { name: 'Yair Vered', picPath: pic4, id: 4, games: 3, side: 1, bullseye: 2, points: 10 }
        ]
    },
]

const padding = 20;
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        groupCard: {
            height: `${window.innerHeight - 80}px`,
            spacing: 0,
            direction: 'column',
        },
        detailsCard: {
            padding: `${padding}px`,
            height: `${window.innerHeight - 80 - (padding * 2)}px`,
        }
    }),
);

const Groups = () => {
    const [selectedGroup, setSelectedGroup] = useState(groupsfakedata[0]);

    const classes = useStyles();

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
    }

    const renderGroupsLayout = () => {
        return (
            <List className={classes.root}>
                {
                    groupsfakedata.map(group => {
                        return (
                            <ListItem
                                button
                                key={group.id}
                                selected={group.id === selectedGroup.id}
                                onClick={() => handleGroupSelection(group)}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={group.name}
                                    secondary={group.description}
                                />
                            </ListItem>
                        )
                    })
                }


            </List>
        );
    };

    const renderGroupsDetailsLayout = () => {
        return (
            <div>
                {/* <Typography variant="h4">{selectedGroup.name}</Typography> */}
                <GroupItem group={selectedGroup} />
            </div>
        );
    };

    const renderLayout = () => {
        return (
            <Grid container spacing={1} alignItems="stretch">
                <Grid item lg={2} xl={2}>
                    <Card className={classes.groupCard}>
                        {renderGroupsLayout()}
                    </Card>
                </Grid>
                <Grid item lg={10} xl={10}>
                    <Card className={classes.detailsCard}>
                        {renderGroupsDetailsLayout()}
                    </Card>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className={classes.root}>
            {renderLayout()}
        </div>
    )
}

export default Groups;