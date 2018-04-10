const User = require('../../models/User');
const controller = {
    showHome(res) {
        res.send("Hello");
    },
    login(req, res, userRepository) {
        const username = req.body.username;
        const password = req.body.password;
        
        userRepository.findUserByParams({username, password})
        .then((users)=>{
            if(users.length == 0) {
                res.send("Not found");
                return;
            }
            else if(users.length > 1) {
                res.send("System error: more than 1 user with the same name and pass");
                return;
            }
            else {
                res.send(users[0]);
                return;
            }
        })
        .catch(()=>{
            res.send("Error occured");
            return;
        });
    },
    register(req, res, userRepository){
        const name = req.body.name;
        const id = req.body.id;
        const username = req.body.username;
        const password = req.body.password;
        const city = req.body.city;
        const user = new User(name, id, username, password, city);
        userRepository.insertUser(user)
        .then(()=>{
            res.send("Succesfull");
            return;
        })
        .catch(()=> {
            res.send("Error");
            return;
        });
                 
    }
}
module.exports = controller;