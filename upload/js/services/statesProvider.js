'use strict';
var statesServices = angular.module('statesServices',['ngResource']);

statesServices.factory('getStatesResourceSvc', ['$resource',
    function($resource){
        //return $resource('http://localhost/apps/addresses/address_api/addressTypeMainOther/',{otherID:'3291', typeMain: 'Customer',format:'json'});//otherID:, typeMain: 'Customer',
        return {
            getCountriesFromStateTable: $resource('http://'+location.hostname+'/tools/states/states_api/countryInfo/',{format:'json'}),
            getStatesFromStatesTbl: $resource('http://'+location.hostname+'/tools/states/states_api/statesInfo/',{format:'json'}),
            getStatesFromCountryChange:  $resource('http://'+location.hostname+'/tools/states/states_api/statesInfoByCountryChange/',{format:'json'})
        }
    }
]);
