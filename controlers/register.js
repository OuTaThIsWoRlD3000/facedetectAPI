const handleregister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !password || !name){
      return res.status(400).json('incorrect form submition')
    }
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
              })
              .then(user => {
                res.json(user[0]);
              })
        .then(trx.commit)
        .catch(trx.rollback)
        })
    })
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    .catch(err => res.status(400).json("unable to register"))
}

module.exports = {
    handleregister: handleregister
};