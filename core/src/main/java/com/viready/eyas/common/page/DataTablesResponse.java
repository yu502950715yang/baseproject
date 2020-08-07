package com.viready.eyas.common.page;

import com.github.pagehelper.PageInfo;

import java.util.List;

public class DataTablesResponse<T> {
    private List<T> data;
    private int recordsTotal;
    private int recordsFiltered;
    private int draw;

    public DataTablesResponse(PageInfo<T> data, int draw) {

        this.recordsTotal = (int) data.getTotal();
        this.recordsFiltered = (int) data.getTotal();
        this.draw = draw;
        this.data = data.getList();
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(int recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public int getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(int recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public int getDraw() {
        return draw;
    }

    public void setDraw(int draw) {
        this.draw = draw;
    }
}
