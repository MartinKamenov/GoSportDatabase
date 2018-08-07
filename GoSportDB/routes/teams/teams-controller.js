const datetime = require('../../models/DateTime');
const Team = require('../../models/Team');

const controller = {
    showAllTeams(req, res, teamRepository) {
        teamRepository.getAllTeams().then((teams) => {
            res.send(teams);
        });
    },

    addTeam(req, res, teamRepository, userRepository, idGenerator) {
        const id = idGenerator.getTeamId();
        if (!id) {
            res.send('Error with id');
            return;
        }
        const name = req.body.name;
        const sport = req.body.sport;
        const players = [];
        const requestingPlayers = [];
        const adminId = +req.body.adminId;
        const date = new Date();
        datetime.year = date.getFullYear();
        datetime.month = date.getMonth();
        datetime.dayOfMonth = date.getDay();
        datetime.hour = date.getHours();
        datetime.minute = date.getMinutes();
        const imageString = req.body.imageString;
        let fileName;
        if (!imageString) {
            fileName = 'default' + '.jpg';
        } else {
            fileName = id + '.jpg';
        }
        const pathToProfile = "/static/images/logos/" + fileName;

        userRepository.findUserById(adminId).then((foundUsers) => {
            if (foundUsers.length !== 1) {
                res.send('Error: more or less than one user found');
                return;
            }
            const admin = foundUsers[0];
            players.push(admin);

            const team = new Team(id, name, sport, players, requestingPlayers, pathToProfile, datetime);

            teamRepository.insertTeam(team)
                .then((allTeams) => {
                    if (imageString) {
                        this.uploadPicture(imageString, fileName);
                    }
                    res.send(allTeams[allTeams.length - 1]);
                    return;
                });
        });
    },

    uploadPicture(img, fileName) {
        const pathToProfile = "/static/images/logos/";

        const indexOfEndForFilePath = __filename.indexOf('routes') - 1;

        const fullPath = __filename.slice(0, indexOfEndForFilePath) + pathToProfile;

        require("fs").writeFile(fullPath + fileName, img, 'base64', function(err) {
            if (err) {
                console.log(err);
            }
        });
    },
    showTeam(req, res, teamRepository) {
        const id = +req.params.id;
        teamRepository.findTeamById(id).then((foundTeams) => {
            if (foundTeams.length !== 1) {
                res.send('Problem with teams count');
                return;
            }
            res.send(foundTeams[0]);
        });
    },
    requestJoin(req, res, teamRepository, userRepository) {
        const userId = +req.body.id;
        const teamId = +req.params.id;
        userRepository.findUserById(userId).then(foundUsers => {
            const user = foundUser[0];
            teamRepository.findTeamById(teamId).then(foundTeams => {
                const team = foundTeams[0];
                if (team.requestingPlayers.find(r.id === user.id)) {
                    res.send('Player has already requested to join');
                    return;
                }
                team.requestingPlayers.push(user);
                teamRepository.removeTeam(teamId).then(() => {
                    teamRepository.insertTeam(team).then((teams) => {
                        res.send(teams[0]);
                    });
                })
            });
        })
    },
    joinPlayer(req, res, teamRepository, userRepository) {
        const userId = +req.body.id;
        const teamId = +req.params.id;
        userRepository.findUserById(userId).then(foundUsers => {
            const user = foundUser[0];
            teamRepository.findTeamById(teamId).then(foundTeams => {
                const team = foundTeams[0];
                if (team.players.find(r.id === user.id)) {
                    res.send('Player has already joined');
                    return;
                }
                team.requestingPlayers.filter(r => r.id !== user.id);
                team.players.push(user);
                teamRepository.removeTeam(teamId).then(() => {
                    teamRepository.insertTeam(team).then((teams) => {
                        res.send(teams[0]);
                    });
                })
            });
        })
    }
}

module.exports = controller;