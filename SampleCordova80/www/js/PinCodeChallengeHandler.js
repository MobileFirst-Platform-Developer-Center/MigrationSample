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
    var pinCodeChallengeHandler = WL.Client.createSecurityCheckChallengeHandler('PinCode');

    pinCodeChallengeHandler.handleChallenge = function(challenge) {
        showPinCodeDiv();
        var statusMsg = (challenge.errorMsg !== null) ? challenge.errorMsg : "";
        $("#pinCodeErrorMessage").html(statusMsg);
    };

    pinCodeChallengeHandler.handleSuccess = function(data) {
        hidePinCodeDiv();
    };

    pinCodeChallengeHandler.handleFailure = function(error) {
        if (error.failure !== null) {
            $("#pinCodeErrorMessage").html(error.failure);
        } else {
            $("#pinCodeErrorMessage").html("Error in validating pin code");
        }
    };

    $('#PinCodeSubmitButton').bind('click', function () {
        var pinCode = $('#PinCode').val();
        if (pinCode === "") {
            alert("Pin code is required");
            return;
        }

        pinCodeChallengeHandler.submitChallengeAnswer({'pin':pinCode});
    });

    $('#PinCodeCancelButton').bind('click', function () {
        pinCodeChallengeHandler.cancel();
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
