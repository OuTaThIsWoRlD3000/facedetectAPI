const handleprofile = (req, res, db) => {
    const { id } = req.params;
    // let found = false;
    db.select('*').from('users').where({id}).then(user => {
        if (user.length){
            res.json(user)
        }else {
            res.status(400).json("Not Found")
        }
    })
}

module.exports = {
    handleprofile: handleprofile
}