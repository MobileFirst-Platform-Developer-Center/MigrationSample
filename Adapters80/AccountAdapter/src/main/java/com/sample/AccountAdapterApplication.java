

package com.sample;

import java.util.logging.Logger;
import com.worklight.wink.extensions.MFPJAXRSApplication;

public class AccountAdapterApplication extends MFPJAXRSApplication{

	static Logger logger = Logger.getLogger(AccountAdapterApplication.class.getName());

	@Override
	protected void init() throws Exception {
		logger.info("Adapter initialized!");
	}

	@Override
	protected void destroy() throws Exception {
		logger.info("Adapter destroyed!");
	}

	@Override
	protected String getPackageToScan() {
		//The package of this class will be scanned (recursively) to find JAX-RS resources.
		//It is also possible to override "getPackagesToScan" method in order to return more than one package for scanning
		return getClass().getPackage().getName();
	}
}
