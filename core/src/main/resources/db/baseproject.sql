/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.12-log : Database - eyas
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `sys_db_backup` */

DROP TABLE IF EXISTS `sys_db_backup`;

CREATE TABLE `sys_db_backup` (
  `backup_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '备份id',
  `backup_time` datetime DEFAULT NULL COMMENT '备份生成时间',
  `sql_path` varchar(200) DEFAULT NULL COMMENT '备份sql文件存放位置',
  `backup_type` int(1) DEFAULT NULL COMMENT '备份类型，1为系统自动，2为手动',
  `operator_name` varchar(20) DEFAULT NULL COMMENT '备份人姓名',
  `status` int(1) DEFAULT NULL COMMENT '备份状态',
  `backup_memo` varchar(500) DEFAULT NULL COMMENT '备份原因',
  `operator_id` int(11) DEFAULT NULL COMMENT '备份人id，系统自动备份为0，其他按用户id存',
  PRIMARY KEY (`backup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_db_backup` */

/*Table structure for table `sys_dict_define` */

DROP TABLE IF EXISTS `sys_dict_define`;

CREATE TABLE `sys_dict_define` (
  `dict_name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL COMMENT 'description',
  PRIMARY KEY (`dict_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_dict_define` */

insert  into `sys_dict_define`(`dict_name`,`description`) values ('backupType','backupType'),('enableStatus','Enable Status'),('yesOrNot','Yes Or Not');

/*Table structure for table `sys_dict_value` */

DROP TABLE IF EXISTS `sys_dict_value`;

CREATE TABLE `sys_dict_value` (
  `dict_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'diction id',
  `dict_name` varchar(50) NOT NULL COMMENT 'diction name',
  `dict_code` varchar(20) NOT NULL COMMENT 'diction code',
  `dict_value` varchar(50) DEFAULT NULL COMMENT 'diction value',
  `status` tinyint(1) DEFAULT '1' COMMENT 'status',
  `sort_id` double DEFAULT NULL COMMENT 'sort_id',
  `locale` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`dict_name`,`dict_code`,`dict_id`),
  KEY `dict_id` (`dict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_dict_value` */

insert  into `sys_dict_value`(`dict_id`,`dict_name`,`dict_code`,`dict_value`,`status`,`sort_id`,`locale`) values (5,'backupType','1','Automatic backup',1,1,'en'),(7,'backupType','1','自动备份',1,1,'zh_CN'),(6,'backupType','2','Manual backup',1,2,'en'),(8,'backupType','2','手动备份',1,2,'zh_CN'),(1,'enableStatus','0','Disabled',1,2,'en'),(9,'enableStatus','0','停用',1,2,'zh_CN'),(2,'enableStatus','1','Enabled',1,1,'en'),(10,'enableStatus','1','启用',1,1,'zh_CN'),(3,'yesOrNot','0','Not',1,2,'en'),(11,'yesOrNot','0','否',1,2,'zh_CN'),(4,'yesOrNot','1','Yes',1,1,'en'),(12,'yesOrNot','1','是',1,1,'zh_CN');

/*Table structure for table `sys_language` */

DROP TABLE IF EXISTS `sys_language`;

CREATE TABLE `sys_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(10) DEFAULT NULL COMMENT '语言标识',
  `language_name` varchar(50) DEFAULT NULL COMMENT '语言名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='系统语言';

/*Data for the table `sys_language` */

insert  into `sys_language`(`id`,`locale`,`language_name`) values (1,'en','English'),(2,'zh_CN','简体中文');

/*Table structure for table `sys_log` */

DROP TABLE IF EXISTS `sys_log`;

CREATE TABLE `sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `module` varchar(20) NOT NULL DEFAULT '' COMMENT '模块名称',
  `handle` varchar(20) NOT NULL DEFAULT '' COMMENT '操作',
  `create_date` datetime DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `request_uri` varchar(255) DEFAULT NULL,
  `request_method` varchar(255) DEFAULT NULL,
  `request_params` varchar(500) DEFAULT NULL,
  `response_result` varchar(500) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `response_time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_log` */

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `menu_id` varchar(20) NOT NULL COMMENT 'primary key',
  `icon` varchar(50) DEFAULT '' COMMENT 'icon',
  `url` varchar(200) DEFAULT '' COMMENT 'url',
  `perm_token` varchar(100) NOT NULL COMMENT 'permission token',
  `parent_id` varchar(20) NOT NULL COMMENT 'parent id',
  `level` varchar(10) NOT NULL COMMENT 'level',
  `leaf` tinyint(1) NOT NULL COMMENT 'is leaf,0 no,1 yes',
  `sort_id` double DEFAULT NULL COMMENT 'sort_id',
  `memo` varchar(200) DEFAULT '' COMMENT 'memo',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'is enable,0 no,1 yes',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`menu_id`,`icon`,`url`,`perm_token`,`parent_id`,`level`,`leaf`,`sort_id`,`memo`,`status`) values ('01','','','manage:system:open','-1','0',0,1,NULL,1),('0101','fa fa-cogs','','manage:system:open','01','1',0,1,'',1),('010101','icon-lock','','system:security:open','0101','2',0,2,'',1),('01010101','icon-people','b/core/user','b:user:open','010101','3',1,3,'User Management',1),('01010102','icon-user','b/core/role','b:role:open','010101','3',1,4,'Role Management',1),('010102','fa fa-anchor','','system:setting:open','0101','2',0,5,'System Setting',1),('01010201','fa fa-book','b/core/dictValue','b:dict:open','010102','3',1,6,'Dictionary',1),('01010202','fa fa-cog','b/core/globalParam','b:globalParam:open','010102','3',1,9,'Sys Param',1),('01010203','fa fa-sitemap','b/core/organ','b:organization:open','010102','3',1,11,'Organization',1),('01010204','fa fa-database','b/core/dbBackup','b:dbBackup:open','010102','3',1,13,'Database Backup',1),('010103','fa fa-video-camera','b/core/log','b:log:open','0101','2',1,10,'Log',1),('010104','icon-wrench','','system:develop:open','0101','2',0,6,'Develop',1),('01010401','fa fa-bars','b/core/menu','b:menu:open','010104','3',1,1,'Menu',1),('01010402','icon-key','b/core/permission','b:permission:open','010104','3',1,2,'Permission',1),('01010403','fa fa-code','b/core/codeGenerator','b:codeGenerator:open','010104','3',1,1000,'',1),('01010404','fa fa-language','b/core/language','b:language:open','010104','3',1,1000,'System Language',1);

/*Table structure for table `sys_menu_name` */

DROP TABLE IF EXISTS `sys_menu_name`;

CREATE TABLE `sys_menu_name` (
  `menu_id` varchar(11) NOT NULL,
  `locale` varchar(10) NOT NULL,
  `menu_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`menu_id`,`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_menu_name` */

insert  into `sys_menu_name`(`menu_id`,`locale`,`menu_name`) values ('01','en','System Management'),('01','zh_CN','系统管理'),('0101','en','System'),('0101','zh_CN','系统管理'),('010101','en','Security'),('010101','zh_CN','安全管理'),('01010101','en','User'),('01010101','zh_CN','用户管理'),('01010102','en','Role'),('01010102','zh_CN','角色管理'),('010102','en','System Setting'),('010102','zh_CN','系统设置'),('01010201','en','Dictionary'),('01010201','zh_CN','数据字典'),('01010202','en','Sys Parameter'),('01010202','zh_CN','全局参数设置'),('01010203','en','Organization'),('01010203','zh_CN','组织机构管理'),('01010204','en','Database Backup'),('01010204','zh_CN','数据库备份'),('010103','en','Log'),('010103','zh_CN','日志'),('010104','en','Develop'),('010104','zh_CN','开发人员工具'),('01010401','en','Menu'),('01010401','zh_CN','菜单管理'),('01010402','en','Permission'),('01010402','zh_CN','权限字符串'),('01010403','en','Code Generator'),('01010403','zh_CN','代码生成'),('01010404','en','系统语言'),('01010404','zh_CN','系统语言');

/*Table structure for table `sys_organization` */

DROP TABLE IF EXISTS `sys_organization`;

CREATE TABLE `sys_organization` (
  `organization_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'organization id',
  `organization_name` varchar(200) DEFAULT NULL COMMENT 'organization name',
  `parent_id` varchar(20) NOT NULL COMMENT 'parent id',
  `level` varchar(10) NOT NULL COMMENT 'level',
  `leaf` tinyint(1) NOT NULL COMMENT 'is leaf',
  `sort_id` double DEFAULT NULL COMMENT 'sort_id',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'is enable,0 no,1 yes',
  PRIMARY KEY (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4001 DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_organization` */

insert  into `sys_organization`(`organization_id`,`organization_name`,`parent_id`,`level`,`leaf`,`sort_id`,`status`) values (1000,'1000 lovcreate Ltd. Australia Branch','1010','2',1,1001,1),(1010,'1010 lovcreate Ltd. ','-1','1',0,1000,1),(2000,'2000 lovcreate Ltd. Changchun Branch','1010','2',1,1002,1),(3000,'3000 lovcreate Ltd. Guangzhou Branch','1010','2',1,1003,1),(4000,'4000 lovcreate Ltd. Hongkong Branch','1010','2',1,1004,1);

/*Table structure for table `sys_global_param` */

DROP TABLE IF EXISTS `sys_global_param`;

CREATE TABLE `sys_global_param` (
  `param_name` varchar(50) DEFAULT NULL COMMENT 'global parameter name',
  `param_value` varchar(50) DEFAULT NULL COMMENT 'global parameter value',
  `param_Description` varchar(100) DEFAULT NULL COMMENT 'parameter description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_global_param` */

insert  into `sys_global_param`(`param_name`,`param_value`,`param_Description`) values ('maxBackupCount','30','Store up to.Sql number of backups'),('backupDefaultDir','D:/backup/lamb','The default storage path of.Sql database backup file'),('backupReserveDate','07,14,21,28','database script reservation date'),('dbbackuptableSqlpath','D:/backup/lamb/dbBackupTableSql_backup','separate backup db_backup table generated db_backup.sql storage location'),('isCaptchaOn','false','The switch of Captcha');

/*Table structure for table `sys_permission` */

DROP TABLE IF EXISTS `sys_permission`;

CREATE TABLE `sys_permission` (
  `perm_token` varchar(100) NOT NULL COMMENT 'permission token',
  `description` varchar(100) DEFAULT NULL COMMENT 'description',
  `parent_id` varchar(20) DEFAULT NULL COMMENT 'the primary key of sys_menu',
  PRIMARY KEY (`perm_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_permission` */

insert  into `sys_permission`(`perm_token`,`description`,`parent_id`) values ('b:codeGenerator:open','查看','01010403'),('b:dbBackup:open','查看','01010204'),('b:dict:open','查看','01010201'),('b:globalParam:open','查看','01010202'),('b:language:open','查看','01010404'),('b:log:open','查看','010103'),('b:menu:open','查看','01010401'),('b:organization:open','查看','01010203'),('b:permission:open','查看','01010402'),('b:role:open','查看','01010102'),('b:user:open','查看','01010101');

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'role id',
  `role_name` varchar(50) NOT NULL COMMENT 'role name',
  `description` varchar(100) DEFAULT NULL COMMENT 'role description',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_role` */

insert  into `sys_role`(`role_id`,`role_name`,`description`) values (1,'Administrator','Administrators');

/*Table structure for table `sys_role_permission` */

DROP TABLE IF EXISTS `sys_role_permission`;

CREATE TABLE `sys_role_permission` (
  `role_id` varchar(50) NOT NULL,
  `perm_token` varchar(100) NOT NULL,
  PRIMARY KEY (`role_id`,`perm_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_role_permission` */

insert  into `sys_role_permission`(`role_id`,`perm_token`) values ('1','b:codeGenerator:open'),('1','b:dbBackup:open'),('1','b:dict:open'),('1','b:globalParam:open'),('1','b:language:open'),('1','b:log:open'),('1','b:menu:open'),('1','b:organization:open'),('1','b:permission:open'),('1','b:role:open'),('1','b:user:open'),('1','manage:system:open'),('1','system:develop:open'),('1','system:security:open'),('1','system:setting:open');

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT 'user name',
  `nickname` varchar(50) NOT NULL DEFAULT '' COMMENT 'nick name',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT 'password',
  `email_address` varchar(250) DEFAULT NULL COMMENT '邮箱地址',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_user` */

insert  into `sys_user`(`user_id`,`username`,`nickname`,`password`,`email_address`) values (1,'admin','Administrator','21232F297A57A5A743894A0E4A801FC3',NULL);

/*Table structure for table `sys_user_organization` */

DROP TABLE IF EXISTS `sys_user_organization`;

CREATE TABLE `sys_user_organization` (
  `user_id` varchar(50) NOT NULL COMMENT '用户ID',
  `organization_id` varchar(50) NOT NULL COMMENT '组织机构ID',
  PRIMARY KEY (`user_id`,`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_user_organization` */

/*Table structure for table `sys_user_role` */

DROP TABLE IF EXISTS `sys_user_role`;

CREATE TABLE `sys_user_role` (
  `user_id` varchar(50) NOT NULL,
  `role_id` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_user_role` */

insert  into `sys_user_role`(`user_id`,`role_id`) values ('1','1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


DROP TABLE IF EXISTS `sys_attachment`;

CREATE TABLE `sys_attachment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `b_id` varchar(11) DEFAULT '' COMMENT '业务单号',
    `table_name` varchar(50) NOT NULL DEFAULT '' COMMENT '业务表名',
    `attachment_type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '附件类型，为了区分一个业务表多个附件的情况',
    `path` varchar(500) NOT NULL DEFAULT '' COMMENT '附件存储地址',
    `store_name` varchar(50) NOT NULL DEFAULT '' COMMENT '以uuid命名的实际文件名',
    `url` varchar(500) DEFAULT '' COMMENT '附件访问url',
    `file_name` varchar(200) DEFAULT '' COMMENT '附件名',
    `extension` varchar(50) NOT NULL DEFAULT '' COMMENT '扩展名',
    `size` varchar(50) DEFAULT '' COMMENT '附件大小，以字节单位存储',
    `delete_status` tinyint(1) DEFAULT '0' COMMENT '目前是否标记为删除0未删除1删除',
    `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态：0业务单未保存，临时附件，1业务单已保存',
    `creator_id` varchar(11) DEFAULT '' COMMENT '创建人id',
    `create_time` datetime DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Bootstrap FileInput
/*[12:50:12][394 ms]*/ INSERT INTO `sys_role_permission` (`role_id`, `perm_token`) VALUES ('1', 'b:attachmentManage:open');
/*[14:58:14][73 ms]*/ INSERT INTO `sys_dict_define` (`dict_name`, `description`) VALUES ('attachmentStatus', '附件状态');
INSERT INTO `sys_dict_value` (`dict_name`, `dict_code`, `dict_value`, `sort_id`, `locale`) VALUES ('attachmentStatus', '0', 'Temporary files', '1', 'en');
INSERT INTO `sys_dict_value` (`dict_name`, `dict_code`, `dict_value`, `sort_id`, `locale`) VALUES ('attachmentStatus', '0', '临时文件', '1', 'zh_CN');
INSERT INTO `sys_dict_value` (`dict_name`, `dict_code`, `dict_value`, `sort_id`, `locale`) VALUES ('attachmentStatus', '1', 'Saved files', '2', 'en');
INSERT INTO `sys_dict_value` (`dict_name`, `dict_code`, `dict_value`, `sort_id`, `locale`) VALUES ('attachmentStatus', '1', '已保存', '2', 'zh_CN');


DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_name` varchar(255) DEFAULT NULL COMMENT '任务名',
  `description` varchar(255) DEFAULT NULL COMMENT '任务描述',
  `cron_expression` varchar(255) DEFAULT NULL COMMENT 'cron表达式',
  `bean_class` varchar(255) DEFAULT NULL COMMENT '任务执行时调用哪个类的方法 包名+类名',
  `job_status` varchar(255) DEFAULT NULL COMMENT '任务状态',
  `job_group` varchar(255) DEFAULT NULL COMMENT '任务分组',
  `create_user` varchar(64) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user` varchar(64) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS QRTZ_FIRED_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_PAUSED_TRIGGER_GRPS;
DROP TABLE IF EXISTS QRTZ_SCHEDULER_STATE;
DROP TABLE IF EXISTS QRTZ_LOCKS;
DROP TABLE IF EXISTS QRTZ_SIMPLE_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_SIMPROP_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_CRON_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_BLOB_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_JOB_DETAILS;
DROP TABLE IF EXISTS QRTZ_CALENDARS;

 CREATE TABLE QRTZ_JOB_DETAILS(
  SCHED_NAME VARCHAR(120) NOT NULL,
  JOB_NAME VARCHAR(170) NOT NULL,
  JOB_GROUP VARCHAR(170) NOT NULL,
  DESCRIPTION VARCHAR(250) NULL,
  JOB_CLASS_NAME VARCHAR(250) NOT NULL,
  IS_DURABLE VARCHAR(1) NOT NULL,
  IS_NONCONCURRENT VARCHAR(1) NOT NULL,
  IS_UPDATE_DATA VARCHAR(1) NOT NULL,
  REQUESTS_RECOVERY VARCHAR(1) NOT NULL,
  JOB_DATA BLOB NULL,
  PRIMARY KEY (SCHED_NAME,JOB_NAME,JOB_GROUP))
  ENGINE=InnoDB;

CREATE TABLE QRTZ_TRIGGERS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_NAME VARCHAR(170) NOT NULL,
    TRIGGER_GROUP VARCHAR(170) NOT NULL,
    JOB_NAME  VARCHAR(170) NOT NULL,
    JOB_GROUP VARCHAR(170) NOT NULL,
    DESCRIPTION VARCHAR(250) NULL,
    NEXT_FIRE_TIME BIGINT(13) NULL,
    PREV_FIRE_TIME BIGINT(13) NULL,
    PRIORITY INTEGER NULL,
    TRIGGER_STATE VARCHAR(16) NOT NULL,
    TRIGGER_TYPE VARCHAR(8) NOT NULL,
    START_TIME BIGINT(13) NOT NULL,
    END_TIME BIGINT(13) NULL,
    CALENDAR_NAME VARCHAR(170) NULL,
    MISFIRE_INSTR SMALLINT(2) NULL,
    JOB_DATA BLOB NULL,
    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
    FOREIGN KEY (SCHED_NAME,JOB_NAME,JOB_GROUP)
        REFERENCES QRTZ_JOB_DETAILS(SCHED_NAME,JOB_NAME,JOB_GROUP)
);

CREATE TABLE QRTZ_SIMPLE_TRIGGERS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_NAME VARCHAR(170) NOT NULL,
    TRIGGER_GROUP VARCHAR(170) NOT NULL,
    REPEAT_COUNT BIGINT(7) NOT NULL,
    REPEAT_INTERVAL BIGINT(12) NOT NULL,
    TIMES_TRIGGERED BIGINT(10) NOT NULL,
    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
        REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
);

CREATE TABLE QRTZ_CRON_TRIGGERS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_NAME VARCHAR(170) NOT NULL,
    TRIGGER_GROUP VARCHAR(170) NOT NULL,
    CRON_EXPRESSION VARCHAR(170) NOT NULL,
    TIME_ZONE_ID VARCHAR(80),
    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
        REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
);

CREATE TABLE QRTZ_SIMPROP_TRIGGERS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_NAME VARCHAR(170) NOT NULL,
    TRIGGER_GROUP VARCHAR(170) NOT NULL,
    STR_PROP_1 VARCHAR(512) NULL,
    STR_PROP_2 VARCHAR(512) NULL,
    STR_PROP_3 VARCHAR(512) NULL,
    INT_PROP_1 INT NULL,
    INT_PROP_2 INT NULL,
    LONG_PROP_1 BIGINT NULL,
    LONG_PROP_2 BIGINT NULL,
    DEC_PROP_1 NUMERIC(13,4) NULL,
    DEC_PROP_2 NUMERIC(13,4) NULL,
    BOOL_PROP_1 VARCHAR(1) NULL,
    BOOL_PROP_2 VARCHAR(1) NULL,
    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
    REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
);

CREATE TABLE QRTZ_BLOB_TRIGGERS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_NAME VARCHAR(170) NOT NULL,
    TRIGGER_GROUP VARCHAR(170) NOT NULL,
    BLOB_DATA BLOB NULL,
    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
        REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
);

CREATE TABLE QRTZ_CALENDARS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    CALENDAR_NAME  VARCHAR(170) NOT NULL,
    CALENDAR BLOB NOT NULL,
    PRIMARY KEY (SCHED_NAME,CALENDAR_NAME)
);

CREATE TABLE QRTZ_PAUSED_TRIGGER_GRPS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_GROUP  VARCHAR(170) NOT NULL,
    PRIMARY KEY (SCHED_NAME,TRIGGER_GROUP)
);

CREATE TABLE QRTZ_FIRED_TRIGGERS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    ENTRY_ID VARCHAR(95) NOT NULL,
    TRIGGER_NAME VARCHAR(170) NOT NULL,
    TRIGGER_GROUP VARCHAR(170) NOT NULL,
    INSTANCE_NAME VARCHAR(170) NOT NULL,
    FIRED_TIME BIGINT(13) NOT NULL,
    SCHED_TIME BIGINT(13) NOT NULL,
    PRIORITY INTEGER NOT NULL,
    STATE VARCHAR(16) NOT NULL,
    JOB_NAME VARCHAR(170) NULL,
    JOB_GROUP VARCHAR(170) NULL,
    IS_NONCONCURRENT VARCHAR(1) NULL,
    REQUESTS_RECOVERY VARCHAR(1) NULL,
    PRIMARY KEY (SCHED_NAME,ENTRY_ID)
);

CREATE TABLE QRTZ_SCHEDULER_STATE
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    INSTANCE_NAME VARCHAR(170) NOT NULL,
    LAST_CHECKIN_TIME BIGINT(13) NOT NULL,
    CHECKIN_INTERVAL BIGINT(13) NOT NULL,
    PRIMARY KEY (SCHED_NAME,INSTANCE_NAME)
);

CREATE TABLE QRTZ_LOCKS
  (
    SCHED_NAME VARCHAR(120) NOT NULL,
    LOCK_NAME  VARCHAR(40) NOT NULL,
    PRIMARY KEY (SCHED_NAME,LOCK_NAME)
);

/*[12:47:23][404 ms]*/ INSERT INTO `sys_menu` (`menu_id`, `url`, `perm_token`, `parent_id`, `level`, `leaf`,`sort_id`, `memo`) VALUES ('01010408', 'b/core/job', 'b:job:open', '010104', '3', '1','01010408', '');
/*[12:48:08][84 ms]*/ INSERT INTO `sys_menu_name` (`menu_id`, `locale`, `menu_name`) VALUES ('01010408', 'en', '定时任务管理');
/*[12:48:24][79 ms]*/ INSERT INTO `sys_menu_name` (`menu_id`, `locale`, `menu_name`) VALUES ('01010408', 'zh_CN', '定时任务管理');
/*[12:50:12][394 ms]*/ INSERT INTO `sys_role_permission` (`role_id`, `perm_token`) VALUES ('1', 'b:job:open');

ALTER TABLE sys_user ADD phone VARCHAR(20);

/*[12:47:23][404 ms]*/ INSERT INTO `sys_menu` (`menu_id`, `url`, `perm_token`, `parent_id`, `level`, `leaf`,`sort_id`, `memo`) VALUES ('01010409', 'http://172.16.1.83:8081', 'b:question:open', '010104', '3', '1','01010409', '');
/*[12:48:08][84 ms]*/ INSERT INTO `sys_menu_name` (`menu_id`, `locale`, `menu_name`) VALUES ('01010409', 'en', '内部问题查询');
/*[12:48:24][79 ms]*/ INSERT INTO `sys_menu_name` (`menu_id`, `locale`, `menu_name`) VALUES ('01010409', 'zh_CN', '内部问题查询');
/*[12:50:12][394 ms]*/ INSERT INTO `sys_role_permission` (`role_id`, `perm_token`) VALUES ('1', 'b:question:open');