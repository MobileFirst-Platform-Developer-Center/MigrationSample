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

function createPinCodeChallengeHandler() {
	var pinCodeChallengeHandler = WL.Client.createChallengeHandler("PinCodeRealm");

	pinCodeChallengeHandler.isCustomResponse = function(response) {
		if (!response || !response.responseJSON	|| response.responseText === null) {
			return false;
		}
		if (typeof(response.responseJSON.authRequired) !== 'undefined') {
			return true;
		} else {
			return false;
		}
	};
	
	pinCodeChallengeHandler.handleChallenge = function(response) {
		var authRequired = response.responseJSON.authRequired;
	    if (authRequired == true) {
	        showPinCodeDiv();
	        if (response.responseJSON.errorMessage)
	            $("#pinCodeErrorMessage").html(response.responseJSON.errorMessage);
	    } else if (authRequired == false) {
	    	hidePinCodeDiv();
	        pinCodeChallengeHandler.submitSuccess();
	    }
	};
    
    $("#PinCodeSubmitButton").bind('click', function () {
        var pinCode = $('#PinCode').val();
        if (pinCode === "") {
            alert("Pin code is required");
            return;
        }

    	var invocationData = {
    		adapter : "PinCodeAdapter",
    		procedure : "submitAuthentication",
    		parameters : [ pinCode ]
    	};

    	pinCodeChallengeHandler.submitAdapterAuthentication(invocationData, {});
    });
    
    $('#PinCodeCancelButton').bind('click', function () {
	    pinCodeChallengeHandler.submitFailure();
	    hidePinCodeDiv();
	});

	return pinCodeChallengeHandler;
}

function showPinCodeDiv() {
    $("#AppDiv").hide();
    $("#pinCodeErrorMessage").html('');
    $("#PinCode").val('');
    $("#PinCodeDiv").show();
}

function hidePinCodeDiv() {
    $("#AppDiv").show();
    $("#PinCodeDiv").hide();
}
