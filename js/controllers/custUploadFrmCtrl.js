'use strict';

var custUploadFrmController = angular.module('custUploadFrmController', []);


custUploadFrmController.controller('custUploadFrmCtrl',  ['$scope','$location','$routeParams','$filter','$window',//'$fileUploader',
    'getStatesResourceSvc','CookieFactory','getUploadResourceSvc','FileUploader','$modal','indyImagingUploader',
    //'$cookieStore',
    function($scope,$location,$routeParams,$filter,$window,//$fileUploader,
    getStatesResourceSvc,CookieFactory,getUploadResourceSvc,FileUploader,$modal,indyImagingUploader){
        // create a uploader with options
        var dynamicUploadFilesID =  $scope.dynamicUploadFilesID    = [];
        var customerUploadData   =  $scope.customerUploadData      = {};
        var dynamicUploadID      =  $scope.dynamicUploadID         = [];
        
        var modalCustUploadFeedBack;
        var modalErrorCustUpload;
        
        $scope.fileNames;
        $scope.uploadErrCode;
        $scope.uploadErrMsg;
        //console.log(CookieFactory);
        
        // --------------------- Setting Cookie Values -------------------------------------//
        CookieFactory.getCookie('t_Company').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_Company = value;
            }  
        });
        CookieFactory.getCookie('t_Name').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_Name = value;
            }  
        });
        CookieFactory.getCookie('t_Address').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_Address = value;
            }  
        });
        CookieFactory.getCookie('t_City').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_City = value;
            }  
        });
        CookieFactory.getCookie('t_State').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_State = value;
            }  
        });
        CookieFactory.getCookie('t_Zip').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_Zip = value;
            }  
        });
        CookieFactory.getCookie('t_Phone').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_Phone = value;
            } 
        });
        CookieFactory.getCookie('t_Email').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_Email = value;
            }    
        });
        CookieFactory.getCookie('t_IndyContact').then(function(value){
            if(value)
            {
                $scope.customerUploadData.t_IndyContact = value;
            }    
        });
        CookieFactory.getCookie('t_Note').then(function(value){
            if(value)
            {
                //$scope.customerUploadData.t_Note = value;
            }    
        });
        
        $scope.submitted                        = false;
        $scope.customerUploadData.t_IndyContact = "Any One";
        
        $scope.submitCustomerUploadFrmData = function(){
            //alert("inside submit event"); 
            getUploadResourceSvc.updateUploadTblData.update({'formData':$scope.customerUploadData},function(response){
                //console.log(response);
                $scope.dynamicUploadID['kf_Upload']  = response.uploadID;
                $scope.uploader.uploadAll();  
            });
          
        };
        
        $scope.cancelCustomerUploadFrmData = function(){
            //console.info("cancel upload");
            
            getUploadResourceSvc.cancelUpload.update({'kp_Upload':$scope.dynamicUploadID['kf_Upload'],'t_UploadAction':'cancel'},function(response){
                //console.log(response);
                if(response)
                {
                   $scope.cancelUploadFile = true;
                   
                   $scope.uploader.cancelAll(); 
                }    
                //$scope.dynamicUploadID['kf_Upload']  = response.uploadID;
                  
            });
        };
      
        //get State List from country name
        $scope.stateList               = getStatesResourceSvc.getStatesFromStatesTbl.query();
        var uploader = $scope.uploader = new indyImagingUploader({
            url:'http://'+location.hostname+'/tools/uploadFiles/uploadfiles_api/uploadCustomerFiles?format=json',
            formData:[]
        });
        uploader.onTest2 = function(progress){
            var time = Date.now() - this.timeStamp;
            var percent = (progress - this.prevProgress) / 100;
            var chunk = percent * this.file.size;
            var speed = ((chunk / 1024 / 1024) / (time / 1000)).toFixed(2);

            this.timeStamp = Date.now();
            this.prevProgress = progress;

            this.speed = speed;

            console.info('speed', speed, ' mb/sec');
        }
        console.info('uploader', uploader);
//        var uploader = $scope.uploader = new FileUploader({
//             url:'http://'+location.hostname+'/tools/uploadFiles/uploadfiles_api/uploadCustomerFiles?format=json',
//             formData:[]
//        });
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                //console.info(item);
                
                var a = item.name.split(".");
                //console.log("A");
                //console.log(a);
                
                //If a.length is one, it's a visible file with no extension ie. file 
                //If a[0] === "" and a.length === 2 it's a hidden file with no extension ie. .htaccess  
                
                if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) 
                {
                    //console.log("inside if");
                    //console.log(a.length)
                    return false;
                }
                var compare = a.pop();
                var n = '|exe|com|pif|bat|scr|scpt|app|js|dxz|json|dmg'.indexOf(compare);
                
                //console.info(n);
                
                if(n>0)
                {
                    return false;
                }
                else
                {
                    return true;
                }    
            }
        });
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
            //open a modal window and give the user a feed back
            
            //console.info("Item");
            
            //console.info(item);
            var 
            
            // send an email to the developer that adding a file failed
            //var onErrorVariable = 'FileItem: '+fileItem+' '+' Response: '+response+' '+' Status:'+ status+' '+' Headers:'+headers;
            modalErrorCustUpload= $modal.open({
                templateUrl: 'partials/custUploadErrorModal.html',
                controller: modalErrorCustUploadInstanceCtrl,
                backdrop:'static',
                resolve: {
                  onErrorItem: function () {
                      //return deleteOrderShipData;
                      //return 'FileItem: '+fileItem+' '+' Response: '+response+' '+' Status:'+ status+' '+' Headers:'+headers;
                      return item;
                  },
                  onSourceProblem:function(){
                      return  'notValidFile';
                  }
                } 
            });
            // Save btn goes here
            modalErrorCustUpload.result.then(function (getModifiedData) {
               //alert("save +ok");
               $window.location.reload(true); 

            }, function (getModifiedData) { // close btn goes here
                   //alert("cancel");
            });
        };
        uploader.onAfterAddingFile = function(fileItem) {
            //console.info('onAfterAddingFile', fileItem);
            $scope.submitted=true;
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('beging -- onAfterAddingAll');
            console.info(addedFileItems);
            console.log(addedFileItems[0].file.name);
            //console.info('end -- onAfterAddingAll');
            $scope.fileNames    = "<ul>";
            
            for(var i=0; i<addedFileItems.length; i++)
            {
                $scope.fileNames    += "<li>"+ addedFileItems[i].file.name + "</li>";
            }
            $scope.fileNames    += "</ul>";
           
        };
        uploader.onBeforeUploadItem = function(item) {
            //console.info('onBeforeUploadItem', item);
            
            //console.info(item.file.name);
            //var index = uploader.getIndexOfItem(item);
            
            //alert(index);
            //alert($scope.dynamicUploadID['kf_Upload']);
            item.formData.push({kf_Upload: $scope.dynamicUploadID['kf_Upload']});
           
            console.info(item.formData);
            
            CookieFactory.setCookie('t_Company', $scope.customerUploadData.t_Company);
            CookieFactory.setCookie('t_Name', $scope.customerUploadData.t_Name);
            CookieFactory.setCookie('t_Address', $scope.customerUploadData.t_Address);
            CookieFactory.setCookie('t_City', $scope.customerUploadData.t_City);
            CookieFactory.setCookie('t_State', $scope.customerUploadData.t_State);
            CookieFactory.setCookie('t_Zip', $scope.customerUploadData.t_Zip);
            CookieFactory.setCookie('t_Phone', $scope.customerUploadData.t_Phone);
            CookieFactory.setCookie('t_Email', $scope.customerUploadData.t_Email);
            CookieFactory.setCookie('t_IndyContact', $scope.customerUploadData.t_IndyContact);
            
            CookieFactory.setCookie('t_Note', $scope.customerUploadData.t_Note);
            
            //console.log(CookieFactory);
            
        };
        // saves the total size of all loaded files
        console.info($scope.uploader.queue);
        uploader.totalSize = function(){
            var totalFileSize = 0;
            for(var i=0; i<$scope.uploader.queue.length; i++)
            {
                totalFileSize    += $scope.uploader.queue[i].file.size;
            }
            console.info("--total --file size---");
            console.info(totalFileSize);
            return totalFileSize;
        }
        // for each file
        uploader.onBeforeUpload1 = function() {
            //alert("onBeforeUpload1")
            this.timeStamp = Date.now();
            this.prevProgress = 0;
            //console.info(this.prevProgress)
        };
        // for each file
        uploader.onProgress1 = function(progress,fileItem) {
            //alert("onProgress1");
            //console.info("timeStamp");
            //console.info(this.timeStamp);
            //console.info("prevProg");
            //console.info(this.prevProgress);
            //console.info("fileItem.file.size");
            //console.info(fileItem.file.size);
            var time = Date.now() - this.timeStamp;
            var percent = (progress - this.prevProgress) / 100;
            var chunk = percent * fileItem.file.size;
            var speed = ((chunk / 1024 / 1024) / (time / 1000)).toFixed(2);

            this.timeStamp = Date.now();
            this.prevProgress = progress;

            this.speed = speed;

            //console.info('speed', speed, ' mb/sec');
        };
        uploader.onProgressItem = function(fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
            //console.info("----fileItem---");
            //console.info(fileItem);
            
            //console.info("-----progress-----");
            //console.info(progress);
            
            //uploader.onBeforeUpload1();
            //uploader.onProgress1(progress,fileItem);
            
        };
        uploader.calcRemTime = function(inPercent,inBytesPerSec,inTotalBytes) {
            var retTime = null;
            var remain = 0;
            var upBytes = 0;
            var minutes = 0;
            var seconds = 0;
            if(inPercent > 0 && inBytesPerSec > 0 && inTotalBytes > 0) 
            {

                // calculate the remaining bytes
                upBytes = inTotalBytes - ((inTotalBytes * inPercent) / 100);

                // calculate the remaining seconds
                remain = upBytes / inBytesPerSec;

                // create min and sec string
                minutes = Math.floor(remain/60);
                seconds = Math.floor(remain % 60);
                retTime = minutes + " min " + seconds + " sec"; 
            }  
            return retTime;   
        }
        uploader.calcSpeed = function(progress,totalFileSize){
            var time = Date.now() - this.timeStamp;
            
            //var timeStamp   = Date.now();
            //var prevProgress = 0;
            //var time = Date.now() - timeStamp;
            var percent  = (progress - this.prevProgress) / 100;
            //var percent  = (progress - prevProgress)/100; 
            var chunk = percent * totalFileSize;
            var speed = ((chunk / 1024 / 1024) / (time / 1000)).toFixed(2);

            this.timeStamp = Date.now();
            //timeStamp   = Date.now();
            this.prevProgress = progress;
            //prevProgress = progress;

            //this.speed = speed;
            
            

            console.info('speed', speed, ' mb/sec'); 
            
            return speed;
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
            console.info("-----onProgressAll------");
            console.info(progress);
            
            $scope.totalFileSize = uploader.totalSize();
            console.info("---total Size");
            console.info($scope.totalFileSize)
            
            $scope.uploadSpeed = uploader.calcSpeed(progress,$scope.totalFileSize);
            $scope.uploadSpeed = $scope.uploadSpeed*1000000;
            console.info("---upload speed ----");
            console.info($scope.uploadSpeed);
            $scope.remTime     = uploader.calcRemTime(progress,$scope.uploadSpeed,$scope.totalFileSize);
            if($scope.remTime)
            {
                $scope.showRemTime = $scope.remTime; 
            }
            console.info($scope.remTime);
            
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            
            console.log("successItem Response");
            if(response)
            {
                $scope.dynamicUploadFilesID[$scope.dynamicUploadFilesID.length] = response;
            }    
           
            
            console.log(response);
            //alert(reponse);
            console.log("successItem Response");
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
            //alert("onErrorItem");
            console.log("fileItem");
            console.log("fileItem");
            console.log("-------onErrorItem---------");
            console.log("------response-----");
            console.log(response);
            console.log("------status-----");
            console.log(status);
            console.log("------headers-----");
            console.log(headers);
           
            console.log("-------onErrorItem---------");
            $scope.uploadErrCode = status;
            //alert(status);
            $scope.uploadErrMsg = response;
            
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            //alert("on Cancel");
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
            //console.log("----response----");
            //console.log(response);
            //console.info($scope.uploader.queue.length);
//            
//            for(var x=0;x<$scope.uploader.queue;x++)
//            {
//                $scope.dynamicUploadFilesID[x]=response
//            }
            //console.log($scope.dynamicUploadFilesID[x]);
            //$scope.uploader.queue
            //$scope.dynamicUploadFilesID = response;
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            // also send a success email confirmation
            //var tmpfileNames = "id="+"";
            //var tmpfileNames = "";
            //alert("onCompleteItem");
            var fileNames    = "<ul>";
            
            for(var i=0; i<$scope.uploader.queue.length; i++)
            {
                fileNames    += "<li>"+ $scope.uploader.queue[i].file.name + "</li>";
            }
            fileNames        += "</ul>";
//            
            //tmpfileNames     += fileNames;
            console.info($scope.dynamicUploadFilesID);
            console.log("--start-que length---start-");
            console.log($scope.uploader.queue.length);
            console.log("-end--que length---end-");
            
            console.log("-start--uploadFilesLength--start--");
            console.log($scope.dynamicUploadFilesID.length);
            console.log("--end--uploadFilesLength--end--");
            
            if($scope.uploader.queue.length == $scope.dynamicUploadFilesID.length)
            {
                 if(!$scope.cancelUploadFile)
                {
                    getUploadResourceSvc.successEmail.post({uploadFrmID: $scope.dynamicUploadID['kf_Upload'],id:fileNames,
                        customerName:$scope.customerUploadData.t_Name,customerEmail:$scope.customerUploadData.t_Email,
                        notesName:$scope.customerUploadData.t_Note},function(response){

                    });

                    //open a modal window and give the user a feed back
                    modalCustUploadFeedBack= $modal.open({
                        templateUrl: 'partials/custUploadConfirmModal.html',
                        controller: modalCustUploadFeedBackInstanceCtrl,
                        backdrop:'static',
                        resolve: { 
                         rowData: function () {
                              //return deleteOrderShipData;
                              return $scope.uploader;
                          }
                        } 
                    });
                    // Save btn goes here
                    modalCustUploadFeedBack.result.then(function (getModifiedData) {
                       //alert("save +ok");
                       $window.location.reload(true); 

                    }, function (getModifiedData) { // close btn goes here
                           //alert("cancel");
                    });
                }
            }
            else
            {
                // something went wrong // submit uploadID and UploadFiles ID collected from the dynamic array
                // also the uploader.que files and file details
                getUploadResourceSvc.errorEmail.post({customerEmail:$scope.customerUploadData.t_Email,customerName:$scope.customerUploadData.t_Name, 
                        t_IndyContact:$scope.customerUploadData.t_IndyContact,
                        customerPhone:$scope.customerUploadData.t_Phone,
                        uploadFrmID: $scope.dynamicUploadID['kf_Upload'],
                        uploadFileNames:$scope.fileNames,
                        uploadedFileArry:$scope.dynamicUploadFilesID,
                        uploadErrCode:$scope.uploadErrCode,
                        uploadErrMsg:$scope.uploadErrMsg,
                        notesName:$scope.customerUploadData.t_Note},function(response){

                });
                modalErrorCustUpload= $modal.open({
                    templateUrl: 'partials/custUploadErrorModal.html',
                    controller: modalErrorCustUploadInstanceCtrl,
                    backdrop:'static',
                    resolve: {
                        onErrorItem: function () {
                          //return deleteOrderShipData;
                          //return 'FileItem: '+fileItem+' '+' Response: '+response+' '+' Status:'+ status+' '+' Headers:'+headers;
                          return $scope.uploader;
                        },
                        onSourceProblem:function(){
                          return  'someFilesmissing';
                        }
                    } 
                });
                
                // Save btn goes here
                modalErrorCustUpload.result.then(function (getModifiedData) {
                   //alert("save +ok");
                   $window.location.reload(true); 

                }, function (getModifiedData) { // close btn goes here
                       //alert("cancel");
                });
           
                
            }    
           
        };

}]);
var modalCustUploadFeedBackInstanceCtrl = function($scope,$modalInstance,rowData,FileUploader){
    $scope.uploader = rowData;
    
    $scope.successlUploadConfirmModal = function(){
        //alert("ok");
        $modalInstance.close($scope);
    };
};

var modalErrorCustUploadInstanceCtrl = function($scope,$modalInstance,onErrorItem,onSourceProblem,FileUploader){
    console.log(onErrorItem);
    
    console.log(onSourceProblem);
    
    if(onSourceProblem == "notValidFile")
    {
        $scope.custMsg = "Not a valid file extension<strong> "+onErrorItem.name+ " </strong>Please upload a valid File Extension file.";
        
        console.log($scope.custMsg);
        
    }
    else if (onSourceProblem == "someFilesmissing")
    {
        $scope.custMsg = "Sorry for the inconvenience. we will get in touch with you to resolve the upload issue. ";
        
        console.log($scope.custMsg);
    }    
    
    $scope.successlUploadErrorModal = function(){
        //alert("ok");
        $modalInstance.close($scope);
    };
};