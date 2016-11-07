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

import java.util.HashMap;
import java.util.Map;

import com.worklight.server.auth.api.MissingConfigurationOptionException;
import com.worklight.server.auth.api.UserIdentity;
import com.worklight.server.auth.api.WorkLightAuthLoginModule;
import com.worklight.server.auth.api.WorkLightLoginModuleBase;

public class UsernamePasswordLoginModule implements WorkLightAuthLoginModule {
	private String userName;


	@Override
	public boolean login(Map<String, Object> authenticationData) {
		userName = (String)authenticationData.get("user.name");
		String password = (String)authenticationData.get("user.password");
		return (userName != null)  && (!userName.isEmpty()) && userName.equals(password);
	}

	@Override
	public void logout() {
	}

	@Override
	public void abort() {
	}

	@Override
	public void init(Map<String, String> options) throws MissingConfigurationOptionException {
		
	}

	@Override
	public WorkLightLoginModuleBase clone() throws CloneNotSupportedException {
		return null;
	}

	@Override
	public UserIdentity createIdentity(String loginModule) {
	    UserIdentity identity = new UserIdentity(loginModule, userName, userName, null, null, null);
	    return identity;
	}

}
