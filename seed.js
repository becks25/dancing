/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Dancers = Promise.promisifyAll(mongoose.model('Dancers'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedDancers = function() {

    var dancers = [
        {
            danceName: 'Carlton',
            dance: '/js/videos/carlton.gif'
        },
        {
            danceName: 'Paul Rudd',
            dance: '/js/videos/paulrudd.gif'
        },
        {
            danceName: 'Spiderman',
            dance: '/js/videos/spiderman.gif'
        },
        {
            danceName: 'The Elaine',
            dance: '/js/videos/elaine.gif'
        }
    ];

    return Dancers.createAsync(dancers);

};


connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        Dancers.findAsync({}).then(function (dancers) {
                if (dancers.length === 0) {
                    return seedDancers();
                } else {
                    console.log(chalk.magenta('Seems to already be dancer data, exiting!'));
                    process.kill(0);
                }
            }).then(function () {
                console.log(chalk.green('Seed successful!'));
                process.kill(0);
            }).catch(function (err) {
                console.error(err);
                process.kill(1);
            });

    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });

    Dancers.findAsync({}).then(function (dancers) {
        if (dancers.length === 0) {
            return seedDancers();
        } else {
            console.log(chalk.magenta('Seems to already be dancer data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

