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

var userLoginChallengeHandler, pinCodeChallengeHandler;

function wlCommonInit(){
    document.getElementById("balanceButton").addEventListener("click", getBalance);
    document.getElementById("transferButton").addEventListener("click", transferMoney);
    document.getElementById("logoutButton").addEventListener("click", logout);
    userLoginChallengeHandler = createUserLoginChallengeHandler();
    pinCodeChallengeHandler = createPinCodeChallengeHandler();
}

function getBalance(){
	var resourceRequest = new WLResourceRequest("/adapters/AccountAdapter/balance", WLResourceRequest.GET);
	resourceRequest.send().then(
			getBalance_CallbackOK,
			getBalance_CallbackFail
	);
}

function getBalance_CallbackOK(response){
	$("#ResponseDiv").html(response.responseText);
}

function getBalance_CallbackFail(response){
	$("#ResponseDiv").html(response.errorMsg);
}

function transferMoney(){
	var resourceRequest = new WLResourceRequest("/adapters/AccountAdapter/transferMoney", WLResourceRequest.GET);
	resourceRequest.send().then(
			transferMoney_CallbackOK,
			transferMoney_CallbackFail
	);
}

function transferMoney_CallbackOK(response){
	$("#ResponseDiv").html(response.responseText);
}

function transferMoney_CallbackFail(response){
	$("#ResponseDiv").html(response.errorMsg);
}

function logout() {
    WLAuthorizationManager.logout('UserLogin').then(
        function () {
            WLAuthorizationManager.logout('PinCode').then(function () {
                $("#ResponseDiv").html("Logged out");;
            }, function (error) {
                WL.Logger.debug("logout from pinCodeChallengeHandler onFailure: " + JSON.stringify(error));
            });
      },
      function (error) {
          WL.Logger.debug("logout from userLoginChallengeHandler onFailure: " + JSON.stringify(error));
      });
}
