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

import com.worklight.core.auth.OAuthSecurity;
import com.ibm.mfp.server.security.external.resource.AdapterSecurityContext;

import java.util.logging.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;


@Path("/")
public class AccountAdapterResource {
	/*
	 * For more info on JAX-RS see https://jsr311.java.net/nonav/releases/1.1/index.html
	 */
		
	//Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(AccountAdapterResource.class.getName());

	@Context
	AdapterSecurityContext securityContext;

	/* Path for method: "<server address>/StepUp71/adapters/AccountAdapter/balance" */
	@GET
	@Path("/balance")
	@Produces("application/xml")
	@OAuthSecurity(scope="UserLogin")
	public String getBalance(){
		//log message to server log
        logger.info("Getting balance...");
        
        // get the authenticated user name
        String userName = securityContext.getAuthenticatedUser().getDisplayName();
       
		return "Welcome " + userName + ", your balance is 12345.67$";
	}
		
	/* Path for method: "<server address>/StepUp71/adapters/AccountAdapter/balance" */
	@GET
	@Path("/transferMoney")
	@Produces("application/xml")
	@OAuthSecurity(scope="PinCode")
	public String transferMoney(){
		//log message to server log
        logger.info("Transferring money...");
        
		return "The money has been transferred.";
	}
		
}
