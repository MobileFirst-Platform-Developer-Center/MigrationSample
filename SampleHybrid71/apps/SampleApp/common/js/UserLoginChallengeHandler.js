/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function createUserLoginChallengeHandler() {
	var userLoginChallengeHandler = WL.Client.createChallengeHandler("UserLoginRealm");
	
	userLoginChallengeHandler.isCustomResponse = function(response) {
	    if (!response || response.responseText === null) {
	        return false;
	    }
	    var indicatorIdx = response.responseText.search('j_security_check');
	    
	    if (indicatorIdx >= 0){
			return true;
		}  
		return false;
	};
	
	userLoginChallengeHandler.handleChallenge = function(response) {
	    showLoginDiv();
	};
	
	userLoginChallengeHandler.submitLoginFormCallback = function(response) {
	    var isLoginFormResponse = userLoginChallengeHandler.isCustomResponse(response);
	    if (isLoginFormResponse){
	    	userLoginChallengeHandler.handleChallenge(response);
	    } else {
	    	hideLoginDiv();
			userLoginChallengeHandler.submitSuccess();
	    }
	};
	
	$('#AuthSubmitButton').bind('click', function () {
	    var reqURL = '/j_security_check';
	    var options = {};
	    options.parameters = {
	        j_username : $('#AuthUsername').val(),
	        j_password : $('#AuthPassword').val()
	    };
	    options.headers = {};
	    userLoginChallengeHandler.submitLoginForm(reqURL, options, userLoginChallengeHandler.submitLoginFormCallback);
	});
	
	$('#AuthCancelButton').bind('click', function () {
		userLoginChallengeHandler.submitFailure();
		hideLoginDiv();
	});
	
	return userLoginChallengeHandler;
}

function showLoginDiv() {
    $("#AppDiv").hide();
    $("#AuthDiv").show();
    $("#AuthPassword").val('');
    $("#AuthUsername").val('');
}

function hideLoginDiv() {
    $('#AppDiv').show();
    $("#AuthPassword").val('');
    $("#AuthUsername").val('');
    $('#AuthDiv').hide();
}


