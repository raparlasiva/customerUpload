'use strict';
var customerUploadModuleApp = angular.module('customerUploadModuleApp', [
    'ngRoute',
    //'ngCookies',
    //'duScroll',
    'focusDirectiveModule',
    'ui.bootstrap',
    'angularFileUpload',
    'textAngular',
    'custUploadFrmController',
    'addImgDirectiveModule',
    'statesServices',
    'inputMaskDirectiveModule',
    'myCookieService',
    'uploadServicesModule',
    'uploadFilesServicesModule']);

customerUploadModuleApp.config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/', {templateUrl: 'partials/custUploadFrm.html', controller: 'custUploadFrmCtrl',title: 'Upload'})
        
}]);

customerUploadModuleApp.run(['$rootScope',function($rootScope){
    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
        $rootScope.title = currentRoute.title;
    });
}]);
customerUploadModuleApp.factory('indyImagingUploader', ['FileUploader', function(FileUploader) {
    // The inheritance. See https://github.com/nervgh/angular-file-upload/blob/v1.0.2/src/module.js#L686
    FileUploader.inherit(indyImagingUploader, FileUploader);

    function indyImagingUploader(options) {
        //alert('heeii');
        indyImagingUploader.super_.apply(this, arguments);
    }
    
    

    return indyImagingUploader;
}]);
