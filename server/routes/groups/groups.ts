import { Router } from "express";
import {
  isValidObjectId,
  MapReduceOptions,
  model,
  Model,
  Types,
} from "mongoose";
import { IUser } from "../../models/User";
import Group, { IGroup } from "../../models/Group";

import GroupUser, { IGroupUser } from "../../models/GroupUser";
import { EventEmitter } from "events";
import { emit } from "process";

const router = Router();
const Groups: Model<IGroup> = model("Groups");
const Users: Model<IUser> = model("Users");

const parsePlayerScore = (playerId) => {
  return {
    playerId: Types.ObjectId(playerId),
    bullseye: 0,
    points: 0,
    side: 0,
    games: 0,
  };
};

// // Map Reduce Part - Not working on CLOUD CLUSTER MONGODB
// router.get('/getTotalPointsPerUser', async (req, res) => {
//     var options: MapReduceOptions<IGroupUser, string, number> = {
//         map: function() {
//             emit(this.playerId, this.score)
//         },
//         reduce: function (_keyPlayerId, valuesScores) {
//             // Returns some of points per player
//             return valuesScores.map(player => player.score).reduce((a, b) => a + b, 0);
//         }
//     };

//     GroupUser.mapReduce<String, number>(
//         options, (err, results) => {
//             if (err)
//                 console.log(err);
//             return results;
//         }
//     );
// });

// Group By Part
router.get("/groupsCountPerManager", async (req, res) => {
  Groups.aggregate(
    [
      {
        $group: {
          _id: "$manager_id",
          groupsCount: {
            $sum: 1,
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/all", async (req, res) => {
  const conditions = [] as any;
  if (req.query.name) {
    conditions.push({ name: { $regex: req.query.name, $options: "ig" } });
  }
  if (req.query.desc) {
    conditions.push({
      description: { $regex: req.query.desc, $options: "ig" },
    });
  }

  if (!req.user) {
    Groups.find(...conditions).exec(async (err, result) => {
      if (err) {
        res.status(500).send("an error occured while trying to query users");
      } else {
        res.json(result);
      }
    });
  } else {
    // @ts-ignore
    const loggedUser = await Users.find({ googleId: req.user.googleId });
    await Groups.find(
      conditions.length > 0
        ? {
            $and: conditions,
            players: {
              $elemMatch: { playerId: loggedUser[0]._id },
            },
          }
        : {
            players: {
              $elemMatch: { playerId: loggedUser[0]._id },
            },
          }
    ).exec(async (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).send("an error occured while trying to query users");
      } else {
        console.log(req.query.commander);
        const manager = req.query.commander && req.query.commander === "true";
        const resp = result
          .map((group) => {
            return Object.assign(group.toJSON(), {
              isManager:
                group.get("manager_id") === loggedUser[0]._id.toString(),
            });
          })
          .filter((g) =>
            req.query.commander
              ? (g.isManager && manager) || (!g.isManager && !manager)
              : true
          );
        res.json(resp);
      }
    });
  }
});

router.put("/delete", async (req, res) => {
  let { groupId } = req.body;

  const deleteResponse = await Groups.deleteOne({ _id: groupId });
  if (deleteResponse) {
    res.json(deleteResponse);
  } else {
    res.send("500").send("an error occured while tryign to add a new group");
  }
});

router.put("/add", async (req, res) => {
  var { newGroup } = req.body;

  newGroup.players = newGroup.players.map((player) => {
    return parsePlayerScore(player);
  });

  let botGroup = await Group.findOne({});
  let botBets = [];
  botGroup.userBets.map((currBet) => {
    if (currBet.playerId === "6098f6f54212edb12ca71b3c") {
      botBets.push(currBet);
    }
  });

  newGroup.userBets = botBets;

  newGroup.leaguesIds = newGroup.leaguesIds.map((league) => {
    return Types.ObjectId(league);
  });

  const newGroupResponse = await Groups.create(newGroup);
  await newGroupResponse.save();
  if (newGroupResponse) {
    res.json(newGroupResponse);
  } else {
    res.send("500").send("an error occured while tryign to add a new group");
  }
});

router.put("/", async (req, res) => {
  var { updatedGroup } = req.body;

  const result: IGroup = await Groups.findOne({ _id: updatedGroup._id });

  if (!result) {
    res.status(500).send("an error occured while trying to update a group");
  } else {
    try {
      result.players = updatedGroup.players.map((player) => {
        player.playerId = Types.ObjectId(player.playerId);
        return player;
      });
      result.name = updatedGroup.name;
      result.description = updatedGroup.description;

      await result.save();

      res.json(result);
    } catch (ex) {
      console.log(ex.message);
      res.status(500).send("an error occured while trying to update group");
    }
  }
});

router.put("/addBet", async (req, res) => {
  const groups = await Groups.find({});
  const userGroups = groups.filter(
    (group: IGroup) =>
      group.players.findIndex(
        (player) => player.playerId.toString() == req.body.bet.playerId
      ) != -1
  );
  userGroups.forEach((userGroup: IGroup) => {
    userGroup.userBets.push(req.body.bet);
    userGroup.save();
  });
  console.log(userGroups);
});

export default router;
