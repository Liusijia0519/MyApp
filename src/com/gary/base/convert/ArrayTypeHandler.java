package com.gary.base.convert;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

@MappedTypes(String[].class)
public class ArrayTypeHandler extends BaseTypeHandler<String[]> {
	
	@Override
	public void setNonNullParameter(PreparedStatement ps, int i,
			String[] parameter, JdbcType jdbcType) throws SQLException {
		ps.setString(i, StringUtils.join(parameter, ","));
	}

	@Override
	public String[] getNullableResult(ResultSet rs, String columnName)
			throws SQLException {
		String value = rs.getString(columnName);
		if(value != null) {
			return value.split(",");
		}
		return null;
	}

	@Override
	public String[] getNullableResult(ResultSet rs, int columnIndex)
			throws SQLException {
		String value = rs.getString(columnIndex);
		if(value != null) {
			return value.split(",");
		}
		return null;
	}

	@Override
	public String[] getNullableResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		String value = cs.getString(columnIndex);
		if(value != null) {
			return value.split(",");
		}
		return null;
	}

}
