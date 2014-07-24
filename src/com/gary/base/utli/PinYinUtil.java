package com.gary.base.utli;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * 汉语拼音转换工具类
 */
public class PinYinUtil {
	
	/**
	 * 获取汉字的汉语拼音首字母,字符串当中包含英文字母不变
	 * @param 字符串
	 * @return 汉语拼音首字母大写  [王琳琳-->WLL,  王冰C-->WBC]
	 */
	public static String cn2FirstSpell(String chinese) {
		return cn2FirstSpell(chinese, HanyuPinyinCaseType.UPPERCASE);
	}

	/**
	 * 获取汉字的汉语拼音首字母,,字符串当中包含英文字母不变
	 * @param 字符串
	 * @param HanyuPinyinCaseType.UPPERCASE || HanyuPinyinCaseType.LOWERCASE
	 * @return 返回汉语拼音首字母 大写或小写
	 */
	public static String cn2FirstSpell(String chinese, HanyuPinyinCaseType caseType) {
		StringBuilder pybf = new StringBuilder();
		char[] arr = chinese.toCharArray();
		HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
		defaultFormat.setCaseType(caseType);
		defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		for (int i = 0; i < arr.length; i++) {
			if (arr[i] > 128) {
				try {
					String[] _t = PinyinHelper.toHanyuPinyinStringArray(arr[i], defaultFormat);
					if (_t != null) {
						pybf.append(_t[0].charAt(0));
					}
				} catch (BadHanyuPinyinOutputFormatCombination e) {
					e.printStackTrace();
				}
			} else {
				pybf.append(arr[i]);
			}
		}
		return pybf.toString().replaceAll("\\W", "").trim();
	}

	/**
	 * 获取汉字的汉语拼音全拼,字符串当中包含英文字母不变
	 * @param 字符串
	 * @return 返回汉语拼音全拼大写 [王林--> WANGLIN 王冰C--> WANGBINGC]
	 */
	public static String cn2Spell(String chinese) {
		return cn2Spell(chinese, HanyuPinyinCaseType.UPPERCASE);
	}
	
	/**
	 * 获取汉字的汉语拼音全拼,字符串当中包含英文字母不变
	 * @param 字符串
	 * @param HanyuPinyinCaseType.UPPERCASE || HanyuPinyinCaseType.LOWERCASE
	 * @return 返回汉语拼音全拼 大写或小写
	 */
	public static String cn2Spell(String chinese, HanyuPinyinCaseType caseType) {
		StringBuilder pybf = new StringBuilder();
		char[] arr = chinese.toCharArray();
		HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
		defaultFormat.setCaseType(caseType);
		defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		for (int i = 0; i < arr.length; i++) {
			if (arr[i] > 128) {
				try {
					pybf.append(PinyinHelper.toHanyuPinyinStringArray(arr[i], defaultFormat)[0]);
				} catch (BadHanyuPinyinOutputFormatCombination e) {
					e.printStackTrace();
				}
			} else {
				pybf.append(arr[i]);
			}
		}
		return pybf.toString().replaceAll("\\W", "").trim();
	}
}
