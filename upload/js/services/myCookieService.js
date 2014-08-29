'use strict';

var myCookieService = angular.module('myCookieService', []);

myCookieService.factory('CookieFactory', function($q, $timeout){

    return {
        getCookie: function(name){
           var deferred = $q.defer();
           $timeout(function() {
               deferred.resolve($.cookie(name));
           }, 0);

           return deferred.promise;
        },

        getAllCookies: function(){
            return $.cookie();
        },

        setCookie: function(name, value){
            return $.cookie(name, value);
        },

        deleteCookie: function(name){
            return $.removeCookie(name);
        }
    }
});


