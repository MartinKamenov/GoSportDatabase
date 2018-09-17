const controller = {
    // Implement using await
    showAllCustomLocations(req, res, customLocationRepository) {
        customLocationRepository.getAllCustomLocations().then((locations) => {
            res.send(locations);
        });
    }
}

module.exports = controller;