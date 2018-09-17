const controller = {
    async showAllCustomLocations(req, res, customLocationRepository) {
        const locations = await customLocationRepository.getAllCustomLocations();
        res.send(locations);
    }
}

module.exports = controller;