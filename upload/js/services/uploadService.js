var uploadServicesModule = angular.module('uploadServicesModule',['ngResource']);

uploadServicesModule.factory('getUploadResourceSvc', ['$resource',
    function($resource){
        return {
            updateUploadTblData: $resource('http://'+location.hostname+'/tools/upload/upload_api/uploadCustomerInfo/',{format:'json'},{update:{method:'post'}}),
            successEmail: $resource('http://'+location.hostname+'/tools/upload/upload_api/sendUploadEmail/',{format:'json'},{post:{method:'post'}}),
            errorEmail:   $resource('http://'+location.hostname+'/tools/upload/upload_api/sendUploadErroEmail/',{format:'json'},{post:{method:'post'}}),
            cancelUpload: $resource('http://'+location.hostname+'/tools/upload/upload_api/upload/',{format:'json'},{update:{method:'post'}}),
        };
    }
]);


