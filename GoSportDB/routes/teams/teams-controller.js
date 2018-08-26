const datetime = require('../../models/DateTime');
const Team = require('../../models/Team');
const notificationService = require('../../models/services/notificationService');

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
            const user = foundUsers[0];
            const admin = {
                id: user.id,
                username: user.username,
                email: user.email,
                city: user.city,
                profileImg: user.profileImg,
                token: user.token
            };
            players.push(admin);

            const team = new Team(id, name, sport, players, requestingPlayers, pathToProfile, datetime);

            teamRepository.insertTeam(team)
                .then(() => {
                    if (imageString) {
                        this.uploadPicture(imageString, fileName);
                    }
                    user.teams.push(team);
                    userRepository.removeUser(user.id).then(() => {
                        userRepository.insertUser(user).then(() => {
                            res.send(team);
                            return;
                        });
                    });
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
            const user = foundUsers[0];
            teamRepository.findTeamById(teamId).then(foundTeams => {
                const team = foundTeams[0];
                if (team.requestingPlayers.find(r => r.id === user.id)) {
                    res.send('Player has already requested to join');
                    return;
                }
                team.requestingPlayers.push(user);
                teamRepository.removeTeam(teamId).then(() => {
                    teamRepository.insertTeam(team).then(() => {
                        this.notifyForRequest(team, user);
                        res.send(team);
                    });
                })
            });
        })
    },
    notifyForRequest(team, user) {
        const playersTokens = team.players.map((p) => p.token)
            .filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        notificationService.createAndSendMessages(team.name,
            user.username + " иска да се присъедини", playersTokens);
    },
    joinPlayer(req, res, teamRepository, userRepository) {
        const userId = +req.body.id;
        const teamId = +req.params.id;
        userRepository.findUserById(userId).then(foundUsers => {
            const user = foundUsers[0];
            teamRepository.findTeamById(teamId).then(foundTeams => {
                const team = foundTeams[0];
                if (team.players.find(p => p.id === user.id)) {
                    res.send('Player has already joined');
                    return;
                }
                const newRequestingPlayers = team.requestingPlayers.filter(r => r.id !== user.id);
                team.requestingPlayers = newRequestingPlayers;
                team.players.push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    city: user.city,
                    profileImg: user.profileImg,
                    token: user.token
                });
                teamRepository.removeTeam(teamId).then(() => {
                    teamRepository.insertTeam(team).then(() => {
                        user.teams.push(team);
                        userRepository.removeUser(user.id).then(() => {
                            userRepository.insertUser(user).then(() => {
                                this.notifyForJoin(team, user);
                                res.send(team);
                            });
                        });
                    });
                });
            });
        });
    },
    notifyForJoin(team, user) {
        const playerToken = user.token;
        notificationService.createAndSendMessage(team.name,
            "Заявката ви за присъединяване беше приета.", playerToken);
    },
    rejectPlayer(req, res, teamRepository, userRepository) {
        const userId = +req.body.id;
        const teamId = +req.params.id;
        userRepository.findUserById(userId).then(foundUsers => {
            const user = foundUsers[0];
            teamRepository.findTeamById(teamId).then(foundTeams => {
                const team = foundTeams[0];
                const newRequestingPlayers = team.requestingPlayers.filter(r => r.id !== user.id);
                team.requestingPlayers = newRequestingPlayers;
                teamRepository.removeTeam(teamId).then(() => {
                    teamRepository.insertTeam(team).then(() => {
                        res.send(team);
                    });
                });
            });
        });
    }
}

module.exports = controller;