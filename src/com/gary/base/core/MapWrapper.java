package com.gary.base.core;

import java.util.HashMap;

public class MapWrapper<K,V> {

	private HashMap<K, V> innerMap = new HashMap<K, V>();
	
	public HashMap<K, V> getInnerMap() {
		return innerMap;
	}

	public Object get(K key) {
		return innerMap.get(key);
	}
	
	public Object put(K key, V value) {
		return innerMap.put(key, value);
	}
	
	public void putAll(HashMap<? extends K,? extends V> m) {
		innerMap.putAll(m);
	}
	
	public V remove(K key) {
		return innerMap.remove(key);
	}
	
}
