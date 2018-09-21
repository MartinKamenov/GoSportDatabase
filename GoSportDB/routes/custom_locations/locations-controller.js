const Location = require('../../models/Location');

const controller = {
    async showAllCustomLocations(req, res, customLocationRepository) {
        const locations = await customLocationRepository.getAllCustomLocations();
        res.send(locations);
    },
    async addCustomLocationToPending(req, res, customLocationRepository, idGenerator) {
        const longitude = +req.body.longitude;
        const latitude = +req.body.latitude;
        const address = req.body.address;
        const imageString = req.body.imageString;
        const nameOfLocation = req.body.name;
        const id = idGenerator.getCustomLocationId();
        const location = new Location(longitude, latitude, address);
        let fileName = 'default' + '.jpg';
        if (imageString) {
            fileName = id + '.jpg';
            this.uploadPicture(imageString, fileName);
        }

        const imageUrl = "/static/images/locations/" + fileName;
        location.makeLocationCustomized(nameOfLocation, imageUrl, id);
        await customLocationRepository.insertCustomLocation(location);
        res.send(location);
    },
    async approveLocation(req, res, customLocationRepository) {
        const id = +req.body.id;
        const customLocations = await customLocationRepository.findCustomLocationById(id);
        const customLocation = customLocations[0];
        await customLocationRepository.removeCustomLocation(id);
        customLocation.approved = true;
        await customLocationRepository.insertCustomLocation(customLocation);
        res.send(customLocation);
    },
    async rejectLocation(req, res, customLocationRepository) {
        const id = +req.body.id;
        await customLocationRepository.removeCustomLocation(id);
        res.send("Removed location with id" + id);
    },
    uploadPicture(img, fileName) {
        const pathToProfile = "/static/images/locations/";

        const indexOfEndForFilePath = __filename.indexOf('routes') - 1;

        const fullPath = __filename.slice(0, indexOfEndForFilePath) + pathToProfile;

        require("fs").writeFile(fullPath + fileName, img, 'base64', function(err) {
            if (err) {
                console.log(err);
            }
        });
    },
}

module.exports = controller;