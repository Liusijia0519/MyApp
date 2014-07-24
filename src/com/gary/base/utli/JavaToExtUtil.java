package com.gary.base.utli;

import java.io.IOException;
import java.lang.reflect.Field;

import com.gary.operation.domain.Previewresult;


//转换Java实体类为ExtJS中的Model类
public class JavaToExtUtil {

	public static String createModel(Class<?> clazz) throws IOException {

		Field[] fields = clazz.getDeclaredFields();

		String sb = "Ext.define('MyApp.model.business." + clazz.getSimpleName() + "Model"
				+ "', {\r\n\textend: 'Ext.data.Model',\r\n\tfields:[";

		for (Field field : fields) {
			sb += "'" + field.getName() + "',";
		}
		sb = sb.substring(0, sb.length() - 1);
		sb += "]\r\n});";
		return sb.toString();
	}
	
	public static String createGrid(Class<?> clazz) throws IOException {
		Field[] fields = clazz.getDeclaredFields();
		String sn = clazz.getSimpleName();
		String camel = sn.substring(0,1).toLowerCase()+sn.substring(1);
		String lower = sn.toLowerCase();
		String sb = "Ext.define('MyApp.view.business." + lower+"."+sn + "Grid"
				+ "', {\r\n\textend: 'MyApp.business.BaseGridPanel',\r\n\txtype:'business_"+lower+"_"+camel+"Grid"
				+"',\r\n\tframe : true,\r\n\tinitComponent : function() {\r\n\tvar me = this;Ext.applyIf(me, {store : Ext.create('MyApp.store.business."+sn+"Store', {autoLoad : true}),columns : [";

		for (Field field : fields) {
			sb += "{text:'" + field.getName() + "',dataIndex:'"+ field.getName()+"',flex : 1},";
		}
		sb = sb.substring(0, sb.length() - 1);
		sb += "]});me.callParent(arguments);}});";
		return sb.toString();
	}
	
	public static void main(String[] args) {
		try {
			String model = JavaToExtUtil

					.createModel(Previewresult.class);


			System.out.println(model);

			System.out.println(JavaToExtUtil.createGrid(Previewresult.class));

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}


