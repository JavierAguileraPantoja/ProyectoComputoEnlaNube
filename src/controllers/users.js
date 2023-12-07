const usersController = {};
const passport = require('passport');
const User = require('../medels/User');

usersController.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};
usersController.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
        errors.push({ text: 'Password y Confirmar Pasword No coinciden' });
    }

    if (password.length < 4) {
        errors.push({ text: 'Password requiere minimo 4 caracteres' });
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email });
    } else {
        //res.send('Acceso Satisfactorio');
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email ya se encuntra registrado.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password =  await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg','Usuario Registrado con Exito');
            res.redirect('/users/signin');
        }
    }
};

usersController.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

//usersController.signin = (req, res) => {
 //   res.send('Pagina de Signin');
//};
usersController.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersController.logout = (req, res) => {
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada" );
        res.redirect( "/users/signin" );

    });
};


module.exports = usersController;