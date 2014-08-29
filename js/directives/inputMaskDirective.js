var inputMaskDirectiveModule = angular.module('inputMaskDirectiveModule', []);

inputMaskDirectiveModule.directive('numberMaskInput',function(){
   return {
       restrict:'A',
       //replace:true,
       link:function($scope,element,attrs){
           //console.log($scope);
          
              element.mask("(999) 999-9999? x9999");
//            $scope.$watch('addressFrmFieldsData.t_Country',
//                function (newValue) {
//                    switch(newValue){
//                        case "PA" :  
//                            element.mask("(99)-9-999-99999? x99999");
//                          break;
//                        case "CR" :
//                            element.mask("(99)-9-999-99999? x99999");
//                          break;
//                        case "FR" :
//                            element.mask("(99)-9-999-99999? x99999");
//                          break;
//                        case "ES" :
//                            element.mask("(999) 999-9999? x99999");
//                          break;
//                        case "MX" :
//                          element.mask("(99)-9-999-99999? x99999");
//                          break;
//                        default:
//                          element.mask("(999) 999-9999? x9999");
//                      };
//            });
           
           //console.log(element);
           
           //console.log(attrs);  
       }
   } 
});


