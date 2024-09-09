import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email; //lay data tu client truyen len
    let password = req.body.password;//check data tu client

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input password'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    //check email exits
    //compare password, bat loi khi co ton tai ten dang nhap
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin
}