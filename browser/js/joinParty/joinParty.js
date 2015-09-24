app.config(function ($stateProvider) {
    $stateProvider.state('joinParty', {
        url: '/jointheparty',
        templateUrl: 'js/joinParty/joinParty.html',
        controller: 'joinPartyCtrl'
    });
});

