const User = require('../../models/User');
const controller = {
    showHome(res) {
        res.send("Hello");
    },
    login(req, res, userRepository) {
        const username = req.body.username;
        const password = req.body.password;

        userRepository.findUserByParams({ username, password })
            .then((users) => {
                if (users.length == 0) {
                    res.send("Invalid username or password");
                    return;
                } else if (users.length > 1) {
                    res.send("System error: more than 1 user with the same name and pass");
                    return;
                } else {
                    res.send(users[0]);
                    return;
                }
            })
            .catch(() => {
                res.send("Error occured");
                return;
            });
    },
    register(req, res, userRepository, idGenerator) {
        const email = req.body.email;
        const id = idGenerator.getUserId();
        const username = req.body.username;
        const password = req.body.password;
        const city = req.body.city;
        const profileImg = req.body.profileImg;
        let fileName;
        if (!profileImg) {
            fileName = 'default' + '.jpg';
        } else {
            fileName = username + '.jpg';
        }
        const pathToProfile = "/static/images/profile/" + fileName;
        const user = new User(email, id, username, password, city, pathToProfile);
        userRepository.findUserByParams({ username })
            .then((users) => {
                if (users.length > 0) {
                    res.send("Username Taken");
                    return;
                }

                if (profileImg) {
                    this.uploadPicture(profileImg, fileName);
                }
                userRepository.insertUser(user)
                    .then(() => {
                        res.send(user);
                        return;
                    })
                    .catch(() => {
                        res.send("Error");
                        return;
                    });
            })

    },
    uploadPicture(profileImg, fileName) {
        const pathToProfile = "/static/images/profile/";

        const indexOfEndForFilePath = __filename.indexOf('/routes');

        const fullPath = __filename.slice(0, indexOfEndForFilePath) + pathToProfile;

        require("fs").writeFile(fullPath + fileName, profileImg, 'base64', function(err) {
            if (err) {
                console.log(err);
            }
        });
    },
    showUsers(req, res, userRepository) {
        userRepository.getAllUsers()
            .then((users) => {
                res.send(users);
                return;
            })
            .catch(() => {
                res.send("Error");
                return;
            });
    }
}
module.exports = controller;