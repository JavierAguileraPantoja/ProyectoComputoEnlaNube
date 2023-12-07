const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../medels/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //Coincide Email del Usuario
    const user = await User.findOne({ email});
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        //Coincide Password de Usuario
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password Incorrecto' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});


  passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {done(null, user)})
        .catch(err => {done(err, null)});
});
