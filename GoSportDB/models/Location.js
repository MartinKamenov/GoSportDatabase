class Location {
    constructor(longitude, latitude, address) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
    }

    // This method is for CustomLocations and should be called after initialization
    // These locations are saved in CustomLocationRepository
    makeLocationCustomized(name, pictureUrl, id) {
        this.id = id;
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.approved = false;
    }
}
module.exports = Location;