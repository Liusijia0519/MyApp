package com.gary.base.cell;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import com.aspose.cells.ICellsDataTable;

public class MapDataSource implements ICellsDataTable {

	private List<HashMap<String, Object>> dataSource = null;
	
	private int index;
	
	private String[] columns = null;

	public MapDataSource(HashMap<String, Object> data) {
		if(this.dataSource == null) {
			this.dataSource = new ArrayList<HashMap<String,Object>>();
		}
		dataSource.add(data);
	}
	
	public MapDataSource(List<HashMap<String, Object>> data) {
		this.dataSource = data;
	}
	
	@Override
	public void beforeFirst() {
		index = -1;
		columns = this.getColumns();
	}

	@Override
	public Object get(int columnIndex) {
		if(index < 0 || index >= this.getCount()) {
            return null;
        }
		Map<String, Object> record = this.dataSource.get(index);
		String columnName = this.columns[columnIndex];
		return record.get(columnName);
	}

	@Override
	public Object get(String columnName) {
		Map<String, Object> record = this.dataSource.get(index);
		return record.get(columnName);
	}

	@Override
	public String[] getColumns() {
		Map<String, Object> temp = this.dataSource.get(0);
		Set<Entry<String, Object>> entrys = temp.entrySet();
		List<String> columns = new ArrayList<String>();
		for (Entry<String, Object> e : entrys) {
			columns.add(e.getKey());
		}
		String[] s = new String[entrys.size()];
		columns.toArray(s);
		return s;
	}

	@Override
	public int getCount() {
		return this.dataSource.size();
	}

	@Override
	public boolean next() {
		return ++index <= this.getCount();
	}

}
