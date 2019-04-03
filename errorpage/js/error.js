/**
 * this file contains the module to run the errro page 
 */
angular.module('errorApp', [])
.controller('errorController', ['$scope', function($scope){
   console.log("Inside the error controller") 
   $scope.copyRightLabel = copyRightLabel;
   $scope.locale = locale;
   $scope.loginUrl = loginUrl;
   $scope.errorMessages = errorMessages;
   
   $scope.flagMessage = errorMessages[0].title;
   $scope.code = errorMessages[0].statusCode;
   $scope.message = errorMessages[0].message;
   
   $scope.localeBase = {
	   "url.footer.contactUs" : "#/contactUs",
	   "url.footer.disclaimer" : "http://www.w3schools.com",
	   "url.footer.privacy" : "http://www.srinivasan47.github.io/waggle-privacy",
	   "url.footer.termsAndConditionsPath" : "http://www.srinivasan47.github.io/waggle-terms-of-service",
	   "url.footer.triumphLearning" : "http://www.srinivasan47.github.io",
   };
   
   $scope.locale = locale;
   function returnParam(name) {
       return decodeURI(
	       (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ''])[1]
       );
   }
   
   var errorId = returnParam("id");
   
   if(errorId && $scope.errorMessages[errorId]){
       $scope.flagMessage = $scope.errorMessages[errorId].title;
       $scope.code = $scope.errorMessages[errorId].statusCode;
       $scope.message = errorMessages[errorId].message;
   }
}])