const controller = {
    showAllTeams(req, res, teamRepository) {
        teamRepository.getAllTeams().then((teams) => {
            res.send(teams);
        });
    },

    addTeam(req, res, teamRepository) {
        const team = new Team();
        teamRepository.insertTeam(team)
            .then((foundTeam) => {
                if (!foundTeam.length) {
                    res.send('Error: No team has been added');
                    return;
                }

                res.send(foundTeam[foundTeam.length - 1]);
                return;
            });
    }
}

module.exports = controller;