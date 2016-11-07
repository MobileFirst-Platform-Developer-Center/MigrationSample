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

package com.sample;

import java.util.logging.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.worklight.adapters.rest.api.WLServerAPI;
import com.worklight.adapters.rest.api.WLServerAPIProvider;
import com.worklight.core.auth.OAuthSecurity;
import com.worklight.core.oauth.api.OAuthUserIdentity;

@Path("/")
public class AccountAdapterResource {
	/*
	 * For more info on JAX-RS see https://jsr311.java.net/nonav/releases/1.1/index.html
	 */
		
	//Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(AccountAdapterResource.class.getName());

    //Define the server api to be able to perform server operations
    WLServerAPI api = WLServerAPIProvider.getWLServerAPI();

	/* Path for method: "<server address>/StepUp71/adapters/AccountAdapter/balance" */
	@GET
	@Path("/balance")
	@Produces("application/xml")
	@OAuthSecurity(scope="UserLoginRealm")
	public String getBalance(){
		//log message to server log
        logger.info("Getting balance...");
        
        // get the authenticated user name
        OAuthUserIdentity user = api.getSecurityAPI().getSecurityContext().getUserIdentity();
        String userName = user.getDisplayName();        
       
		return "Welcome " + userName + ", your balance is 12345.67$";
	}
		
	/* Path for method: "<server address>/StepUp71/adapters/AccountAdapter/balance" */
	@GET
	@Path("/transferMoney")
	@Produces("application/xml")
	@OAuthSecurity(scope="PinCodeRealm")
	public String transferMoney(){
		//log message to server log
        logger.info("Transferring money...");
        
		return "The money has been transferred.";
	}
		
}
