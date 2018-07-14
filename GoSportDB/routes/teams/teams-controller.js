const controller = {
    showAllTeams(req, res, teamRepository) {
        teamRepository.getAllTeams().then((teams) => {
            res.send(teams);
        });
    }
}

module.exports = controller;