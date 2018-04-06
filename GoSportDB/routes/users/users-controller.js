const controller = {
    showHome(res) {
        res.send("Hello");
    },
    login(req, res, userRepository){
        const password = req.body.password;
        const username = req.body.username;
        userRepository.findUserByParams({password, username})
        .then((users)=>{
            if(users.length == 0){
                res.send("Not found");
                return;
            }
            else if(users.length > 1){
                res.send("System error: more than 1 user with the same name and pass");
                return;
            }
            else{
                res.send(users[0]);
            }
        });
    },
    register(req, res, userRepository){
        const password = req.body.password;
        const username = req.body.username;
        userRepository.insertUser({users})
    }
}
module.exports = controller;