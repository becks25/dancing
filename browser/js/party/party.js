app.config(function ($stateProvider) {
    $stateProvider.state('party', {
        url: '/party',
        templateUrl: 'js/party/party.html',
        controller: 'partyCtrl'
    });
});

