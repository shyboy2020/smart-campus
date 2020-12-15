module.exports = {
    usersql: {
        insert:'INSERT INTO user (userId,email,password) VALUES(?,?,?)',
        queryAll:'SELECT * FROM user ',
    }
}

