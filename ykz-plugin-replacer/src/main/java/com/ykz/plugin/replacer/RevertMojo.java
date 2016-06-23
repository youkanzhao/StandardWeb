package com.ykz.plugin.replacer;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;

/**
 *
 * @goal revert
 * 
 * @phase install
 */
public class RevertMojo extends AbstractMojo {

	/**
	 * @parameter
	 */
	private String revertReplacement;
	
	/**
	 * @parameter
	 */
	private String revertToken;
	

	public void execute() throws MojoExecutionException, MojoFailureException {
		System.out.println("revert: token=" + revertToken + " ==> replacement=" + revertReplacement);
		YKZFileUtils.revertAllToken(revertToken, revertReplacement);
	}
}
