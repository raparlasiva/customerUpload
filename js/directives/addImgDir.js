var addImgDirectiveModule = angular.module('addImgDirectiveModule', []);

addImgDirectiveModule.directive('addImgDirective',['$location',function($location){
    return {
        restrict:'A',
        //replace:true,
        //templateUrl:"inventory/partials/sideBarPanel.html",
        link:function($scope,element,attrs){
          
            element.click(function(){
                //alert("hi");
                //$("input").trigger("click");
                //$scope.submitted = true;
                $('input[type=file]').trigger("click");
                
            });
             
            
       }
    }
    
}]);





