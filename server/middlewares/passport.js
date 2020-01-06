const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const passport = require('passport');

// Add to the array paths that should be ignored by passport
const ignoredPaths = ['/api/auth/token', '/api/auth/signup', '/api/auth/test', '/api/auth/email', '/api/auth/handle'];

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ThisAintNoSecret',
    issuer: 'ShoutOut',
    audience: 'shout-out.me'
};

// Create passport strategy
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.query().select('id', 'handle').where('id', '=', jwt_payload.id).limit(1)
        .then(user => {
            if(user)
                return done(null, user);
            else
                return done(null, false);
        })
        .catch(err => {
            return done(err, false);
        });
}));

module.exports.jwtOptions = {
    secret: opts.secretOrKey,
    issuer: opts.issuer,
    audience: opts.audience
};

module.exports.authenticate = (req, res, next) => {
    if(ignoredPaths.includes(req.originalUrl.toLowerCase())){
        return next();
    }
    else {
        return passport.authenticate('jwt', { session: false})(req, res, next);
    }
};