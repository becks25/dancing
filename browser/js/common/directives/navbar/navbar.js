app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.songs = [
                {
                    label: 'Barbie Girl', 
                    url: '/js/Audio/BarbieGirl.mp3'
                },
                {
                    label: 'Blitzkrieg Bop', 
                    url: '/js/Audio/BlitzkriegBop.mp3'
                },
                {
                    label: 'Build Me Up Buttercup', 
                    url: '/js/Audio/BuildMeUpButtercup.mp3'
                },
                {
                    label: 'Cha Cha Slide', 
                    url: '/js/Audio/ChaChaSlide.mp3'
                },
                {
                    label: 'Come On Eileen', 
                    url: '/js/Audio/ComeOnEileen.mp3'
                },
                {
                    label: 'Do You Love Me', 
                    url: '/js/Audio/DoYouLoveMe.mp3'
                },
                {
                    label: 'Eye Of The Tiger', 
                    url: '/js/Audio/EyeOfTheTiger.mp3'
                },
                {
                    label: 'Funkytown', 
                    url: '/js/Audio/Funkytown.mp3'
                },
                {
                    label: 'Golden Years', 
                    url: '/js/Audio/GoldenYears.mp3'
                },
                {
                    label: "I'm Too Sexy", 
                    url: '/js/Audio/ImTooSexy.mp3'
                },
                {
                    label: 'Johnny B Goode', 
                    url: '/js/Audio/JohnnyBGoode.mp3'
                },
                {
                    label: 'Merengue', 
                    url: '/js/Audio/Merengue.mp3'
                },
                {
                    label: 'Rock Lobster', 
                    url: '/js/Audio/RockLobster.mp3'
                },
                {
                    label: 'Runaround Sue', 
                    url: '/js/Audio/RunaroundSue.mp3'
                },
                {
                    label: 'Shake Shake Shake', 
                    url: '/js/Audio/ShakeShakeShake.mp3'
                },
                {
                    label: 'Shout', 
                    url: '/js/Audio/Shout.mp3'
                },
                {
                    label: 'The Tetris Song', 
                    url: '/js/Audio/Tetris.mp3'
                },
                {
                    label: 'The Twist', 
                    url: '/js/Audio/TheTwist.mp3'
                },
                {
                    label: "This is Why I'm Hot", 
                    url: '/js/Audio/ThisIsWhyImHot.mp3'
                },
                {
                    label: 'Thriller', 
                    url: '/js/Audio/Thriller.mp3'
                },
                {
                    label: 'We Want the Funk', 
                    url: '/js/Audio/WeWantTheFunk.mp3'
                },
                {
                    label: 'X Gonna Give it to ya', 
                    url: '/js/Audio/XGonnaGiveItToYa.mp3'
                },
                {
                    label: 'YMCA', 
                    url: '/js/Audio/YMCA.mp3'
                },
                {
                    label: 'You Sexy Thing', 
                    url: '/js/Audio/YouSexyThing.mp3'
                },
            ];

            // scope.dancesong = {label: 'Select a song', url: 'test'};
            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
