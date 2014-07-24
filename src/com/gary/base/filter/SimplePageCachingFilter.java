package com.gary.base.filter;

import java.net.URL;
import java.util.Enumeration;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.ehcache.CacheException;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.constructs.blocking.LockTimeoutException;
import net.sf.ehcache.constructs.web.AlreadyCommittedException;
import net.sf.ehcache.constructs.web.AlreadyGzippedException;
import net.sf.ehcache.constructs.web.filter.FilterNonReentrantException;

public class SimplePageCachingFilter extends
		net.sf.ehcache.constructs.web.filter.SimplePageCachingFilter {

	private final static String FILTER_URL_PATTERNS = "patterns";
	private static String[] cacheUrls = null;
	
	@Override
	public void doInit(FilterConfig filterConfig) throws CacheException {
		super.doInit(filterConfig);
		String patterns = filterConfig.getInitParameter(FILTER_URL_PATTERNS);
		cacheUrls = patterns.split(",");
	}
	
	@Override
	protected void doFilter(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
			throws AlreadyGzippedException, AlreadyCommittedException,
			FilterNonReentrantException, LockTimeoutException, Exception {
		
		String requestURL = request.getRequestURI() + "?" + request.getQueryString();
		requestURL = requestURL.trim();
		boolean flag = false;
		for (String url : cacheUrls) {
			if (requestURL.contains(url)) {
                flag = true;
                break;
            }
		}
		if (flag) {
			System.out.println(requestURL + "被缓存了");
            super.doFilter(request, response, chain);
        } else {
            chain.doFilter(request, response);
        }
	}
	
    private boolean headerContains(final HttpServletRequest request, final String header, final String value) {
        logRequestHeaders(request);
        final Enumeration<String> accepted = request.getHeaders(header);
        while (accepted.hasMoreElements()) {
            final String headerValue = (String) accepted.nextElement();
            if (headerValue.indexOf(value) != -1) {
                return true;
            }
        }
        return false;
    }
	
    @Override
    protected CacheManager getCacheManager() {
    	URL url = getClass().getResource("/ehcache.xml");
    	return CacheManager.create(url);
    }
    
	@Override
	protected boolean acceptsGzipEncoding(HttpServletRequest request) {
		boolean ie6 = this.headerContains(request, "User-Agent", "MSIE 6.0");
		boolean ie7 = this.headerContains(request, "User-Agent", "MSIE 7.0");
		return acceptsEncoding(request, "gzip") || ie6 || ie7;
	}
}
