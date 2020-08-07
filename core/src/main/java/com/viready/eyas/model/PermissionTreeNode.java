package com.viready.eyas.model;

import lombok.Data;

@Data
public class PermissionTreeNode {
    private String id;
    private String name;
    private String pId;
    private String permToken;
    private String checked;
}
