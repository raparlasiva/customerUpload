var uploadFilesServicesModule = angular.module('uploadFilesServicesModule',['ngResource']);

uploadFilesServicesModule.factory('getUploadFilesResourceSvc', ['$resource',
    function($resource){
        return {
            updateUploadFilesTblData: $resource('http://'+location.hostname+'/tools/upload/upload_api/uploadCustomerInfo/',{format:'json'},{update:{method:'post'}})
        };
    }
]);


