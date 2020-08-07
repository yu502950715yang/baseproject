package com.viready.eyas.common.page;

import java.util.Map;

public class Page {
    private static final int PAGE_SIZE = 30;
    private static final int FIRST_PAGE = 1;
    private static final int MAX_SUM_LIMIT = 10000;
    private int pageSize;
    private int totalResult;
    private int pageNo;
    private String sortField;
    private String sortOrder;
    private String sortFieldType;
    private String[] sumColumns;
    private Map<String, String> sumResult;

    public Page() {
        this.pageSize = 30;
        this.pageNo = 1;
    }

    public Page(String pageNo) {
        this(String.valueOf(30), pageNo);
    }

    public Page(String pageSize, String pageNo) {
        try {
            this.pageNo = Integer.parseInt(pageNo);
        } catch (NumberFormatException var5) {
            this.pageNo = 1;
        }

        try {
            this.pageSize = Integer.parseInt(pageSize);
        } catch (NumberFormatException var4) {
            this.pageSize = 30;
        }

    }

    public int getTotalPage() {
        return this.totalResult % this.pageSize == 0 ? this.totalResult / this.pageSize : this.totalResult / this.pageSize + 1;
    }

    public int getReasonablePageNo() {
        if (this.pageNo <= 0) {
            this.pageNo = 1;
        }

        int totalPage = this.getTotalPage();
        if (this.pageNo > totalPage) {
            this.pageNo = totalPage;
        }

        return this.pageNo;
    }

    public int getCurrentResult() {
        int currentResult = (this.getReasonablePageNo() - 1) * this.getPageSize();
        return Math.max(currentResult, 0);
    }

    public boolean hasSumColumns() {
        return this.sumColumns != null && this.sumColumns.length > 0;
    }

    public boolean lessThanMaxSumLimit() {
        return this.totalResult < 10000;
    }

    public int getTotalResult() {
        return this.totalResult;
    }

    public void setTotalResult(int totalResult) {
        this.totalResult = totalResult;
    }

    public int getPageNo() {
        return this.pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String[] getSumColumns() {
        return this.sumColumns;
    }

    public void setSumColumns(String[] sumColumns) {
        this.sumColumns = sumColumns;
    }

    public Map<String, String> getSumResult() {
        return this.sumResult;
    }

    public void setSumResult(Map<String, String> sumResult) {
        this.sumResult = sumResult;
    }

    public String getSortField() {
        return this.sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    public String getSortOrder() {
        return this.sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getSortFieldType() {
        return this.sortFieldType;
    }

    public void setSortFieldType(String sortFieldType) {
        this.sortFieldType = sortFieldType;
    }
}