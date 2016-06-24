package com.ykz.plugin.replacer;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;

public class YKZFileUtils {

	public static String getExtension(File file) {
		String DOT = ".";
		String fileName = file.getName();
		if (StringUtils.INDEX_NOT_FOUND == StringUtils.indexOf(fileName, DOT)) {
			return StringUtils.EMPTY;
		}
		String ext = StringUtils.substring(fileName, StringUtils.lastIndexOf(fileName, DOT));
		return StringUtils.trimToEmpty(ext).toLowerCase();
	}

	public static Collection<File> getAllFiles() {
		String[] FILE_TYPE = { "htm", "html", "jsp", "php", "asp", "aspx", "css", "js" };
		String baseDir = System.getProperty("user.dir");
		Collection<File> fileList = FileUtils.listFiles(new File(baseDir), FILE_TYPE, true);
		return fileList;
	}

	public static void revertAllToken(String token, String replacement) {
		Collection<File> fileCollection = YKZFileUtils.getAllFiles();
		for (File file : fileCollection) {
			System.out.println("file Path==" + file.getAbsolutePath());
			try {
				String content = FileUtils.readFileToString(file);
				String newContent = content.replaceAll(token, replacement);
				FileUtils.writeStringToFile(file, newContent);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
