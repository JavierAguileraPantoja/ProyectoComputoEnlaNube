const helpers ={};
helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){        
        return next();
    }
    req.flash('error_msg', 'Acceso denegado, es necesario acceder al sistema');
    res.redirect('/users/signin');
};

module.exports = helpers;