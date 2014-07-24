package com.gary.base.interceptor;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.session.RowBounds;

import com.gary.base.core.PageBounds;

/**
 * 通用分页处理逻辑的拦截器
 * 
 * @author 葛新
 */
@Intercepts({@Signature(type=StatementHandler.class,method="prepare",args={Connection.class})}) 
public class PageInterceptor implements Interceptor {

	private static final String SELECT = "select";
	private static final String FROM = "from";
	private static final String ORDER_BY = "order by";
	private static final String GROUP_BY = "group by";
	private static final String UNION = "union";
	private static final Pattern PATTERN_SQL = Pattern.compile("\\s+");
	
	/**
	 * 在myBatis生成Statement对象前修改SQL语句
	 * 替换掉myBatis的SQL 使用我们自己构造的分页SQL
	 * 同时查询总记录数,并设置到PageBounds对象中
	 * 使其支持分页查询
	 */
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		//获取目标对象RoutingStatementHandler
		RoutingStatementHandler statementHandler = (RoutingStatementHandler)invocation.getTarget();
		//Connection
		Connection connection = (Connection) invocation.getArgs()[0];
		
		StatementHandler handler = (StatementHandler) FieldUtils.readField(statementHandler, "delegate", true);
		PageBounds pageBounds = (PageBounds) FieldUtils.readField(handler, "rowBounds", true);
		MappedStatement mappedStatement = (MappedStatement) FieldUtils.readField(handler, "mappedStatement", true);
		BoundSql boundSql = handler.getBoundSql();
		
		System.err.println("mybaits原生SQL = " + boundSql.getSql());
		
		//获取总记录数并且设置到PageBounds中
		getCountAndSetInPageBounds(boundSql, pageBounds, mappedStatement, connection);
		
		//获取改造后分页的SQL
		String pagingSql = getPagingSql(boundSql.getSql(), pageBounds);
		System.err.println("改造支持分页的SQL = " + pagingSql);
		
		//修改BoundSql对象的sql,使用我们带分页的SQL
		FieldUtils.writeDeclaredField(boundSql, "sql", pagingSql, true);
		//设置PageBounds对象为初始状态
		pageBounds.setMeToDefault();
		
		return invocation.proceed();
	}

	/**
	 * 根据参数进行判断当前操作是否为分页查询
	 * 如果是分页操作则返回代理对象,否则返回原生对象
	 * 代理对象会调用intercept方法,动态修改SQL支持分页
	 */
	@Override
	public Object plugin(Object arg0) {
		if(arg0 instanceof RoutingStatementHandler) {
			try {
				Field  delegate = FieldUtils.getField(RoutingStatementHandler.class, "delegate", true);
				StatementHandler handler = (StatementHandler) delegate.get(arg0);
				RowBounds rowBounds = (RowBounds) FieldUtils.readField(handler, "rowBounds", true);
				if(rowBounds != RowBounds.DEFAULT && rowBounds instanceof PageBounds) {
					return Plugin.wrap(arg0, this);	
				}
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return arg0;
	}

	/**
	 * 将SQL语句改造成查询总记录数的SQL
	 * @param sql 正常查询的SQL语句
	 * @return 改造后的SQL语句
	 */
	private String getCountSql(String sql) {  
		StringBuilder sb = new StringBuilder();
		String processSql = processSql(sql).toLowerCase();
		int orderByPos = 0;
		//查询SQL中包含order by需要去掉
		if((orderByPos = processSql.lastIndexOf(ORDER_BY)) != -1) {
			processSql = processSql.substring(0, orderByPos);
		}
		//查询SQL中包含union,group by 需要进行包装
		if(processSql.indexOf(UNION) != -1 || processSql.indexOf(GROUP_BY) != -1) {
			sb.insert(0, "SELECT COUNT(1) AS COUNT FROM ( ").append(processSql).append(" ) AS TEMP");
			//System.err.println("查询总数的SQL = " + sb.toString());
    		return sb.toString();
    	}
		int fromPos = processSql.indexOf(FROM);
		//sb.append("SELECT COUNT(1) AS COUNT").append(" ").append(processSql.substring(fromPos));
		sb.append("SELECT COUNT(1) AS COUNT").append(" FROM ( ").append(processSql);
		sb.append(" ) AS T");
		//System.err.println("查询总数的SQL = " + sb.toString());
		return sb.toString();
	}
	
	/**
	 * 将myBatis原生SQL语句去掉多余空格与换行
	 * @param sql (myBatis配置文件解析后的原生SQL)
	 * @return 转换后的SQL
	 */
	private String processSql(String sql) {
		Matcher matcher = PATTERN_SQL.matcher(sql);
		return matcher.replaceAll(" ");
	}
	
	/**
	 * 将SQL语句转换成分页的SQL语句
	 * @param sql myBatis生成的原生SQL
	 * @return 转换后的SQL
	 */
	private String getPagingSql(String sql, PageBounds pageBounds) {
		String processSql = processSql(sql);
		StringBuilder sb = new StringBuilder(processSql);
		
		processSql = processSql.toLowerCase();
		if(processSql.indexOf(ORDER_BY) != -1) {
			int selectPos = processSql.indexOf(SELECT);
			sb.insert(selectPos + SELECT.length(), " TOP(" + pageBounds.getSelectCount() + ")");
		}
		
		sb.insert(0, "SELECT inner_query.*, ROW_NUMBER() OVER (ORDER BY CURRENT_TIMESTAMP) as __mybatis_row_nr__ FROM ( ");
		sb.append(" ) inner_query ");
		
		sb.insert(0, "WITH query AS (").append(") SELECT ").append("*").append(" FROM query ");
		sb.append("WHERE __mybatis_row_nr__ >= " + (pageBounds.getOffset() + 1) + " AND __mybatis_row_nr__ <= " + pageBounds.getSelectCount());
		
		return sb.toString();
	}
	
	/**
	 * 获得分页的总记录数并且设置到PageBounds对象中
	 * @param boundSql
	 * @param rowBounds (PageBounds分页参数)
	 * @param mappedStatement
	 * @param connection
	 */
	private void getCountAndSetInPageBounds(BoundSql boundSql, PageBounds pageBounds,
							MappedStatement mappedStatement, Connection connection) {
		String countSql = getCountSql(boundSql.getSql()); 
		//参数的映射集合
		List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
		//我们查询传入的参数
		Object parameterObject = boundSql.getParameterObject();
		//构建新的BoundSql
		BoundSql countBoundSql = new BoundSql(mappedStatement.getConfiguration(), countSql, parameterMappings, parameterObject);
		//绑定参数的处理类
		ParameterHandler parameterHandler = new DefaultParameterHandler(mappedStatement, parameterObject, countBoundSql);
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			pstmt = connection.prepareStatement(countSql);  
			parameterHandler.setParameters(pstmt);  
			rs = pstmt.executeQuery();
			if (rs.next()) {  
				int totalRecord = rs.getInt(1);  
				pageBounds.setTotal(totalRecord);
			}  
		} catch (SQLException e) {
			throw new RuntimeException(e.getCause());
		} finally {
			try {
				if(rs != null) {
					rs.close();
				}
				if(pstmt != null) {
					pstmt.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	@Override
	public void setProperties(Properties arg0) {
		
	}

}
