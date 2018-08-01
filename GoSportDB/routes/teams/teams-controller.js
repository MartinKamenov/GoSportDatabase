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
        const name = req.body.name;
        const sport = req.body.sport;
        const players = [];
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
            fileName = name + '.jpg';
        }
        const pathToProfile = "/static/images/logos/" + fileName;

        userRepository.findUserById(adminId).then((foundUsers) => {
            if (foundUsers.length !== 1) {
                res.send('Error: more or less than one user found');
                return;
            }
            const admin = foundUsers[0];
            players.push(admin);

            const team = new Team(id, name, sport, players, pathToProfile, datetime);

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

        const indexOfEndForFilePath = __filename.indexOf('\routes');

        const fullPath = __filename.slice(0, indexOfEndForFilePath) + pathToProfile;

        require("fs").writeFile(fullPath + fileName, img, 'base64', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = controller;