# Host: 193.112.202.42  (Version 5.7.22)
# Date: 2018-06-14 17:48:39
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "admin_role"
#

DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL COMMENT '角色名称',
  `status` tinyint(3) DEFAULT '1' COMMENT '角色状态',
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8 COMMENT='后台角色';

#
# Data for table "admin_role"
#

/*!40000 ALTER TABLE `admin_role` DISABLE KEYS */;
INSERT INTO `admin_role` VALUES (1,'系统管理员',1,'2018-06-14 10:06:51','2018-06-13 14:41:00',NULL);
/*!40000 ALTER TABLE `admin_role` ENABLE KEYS */;
