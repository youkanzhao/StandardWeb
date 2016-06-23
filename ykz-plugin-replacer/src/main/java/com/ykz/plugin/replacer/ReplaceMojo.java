package com.ykz.plugin.replacer;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;

/**
 *
 * @goal replace
 * 
 * @phase validate
 */
public class ReplaceMojo extends AbstractMojo {
	
	/**
	 * @parameter
	 */
	private String replaceReplacement;
	
	/**
	 * @parameter
	 */
	private String replaceToken;
	

	public void execute() throws MojoExecutionException, MojoFailureException {
		System.out.println("replace : token=" + replaceToken + " ==> replacement=" + replaceReplacement);
		YKZFileUtils.revertAllToken(replaceToken, replaceReplacement);
	}
}
