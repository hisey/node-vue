# Host: localhost  (Version 5.7.22-log)
# Date: 2018-06-13 17:52:22
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "admin_user"
#

DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(1000) NOT NULL DEFAULT '',
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `status` tinyint(3) NOT NULL DEFAULT '1' COMMENT '用户状态 1正常  0禁用',
  `role_name` varchar(50) DEFAULT NULL COMMENT '分类名',
  `pic` varchar(64) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8 COMMENT='后台用户';

#
# Data for table "admin_user"
#

/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (26,'root','$2a$10$RREavyfC7Pm1EXYIjcZS6.Ec3qMVveuwMm.GcXoCZOSMbNkxfYVLW','2018-06-13 15:03:59','2017-05-09 23:14:07',NULL,0,NULL,NULL),(27,'666','$2a$10$soVuVqbLSWwliu/6MT0xQ.3VLbXK2FRZhij/50Ni3E5SGwGaVb.ou','2018-06-13 15:09:27','2017-05-13 14:47:04',NULL,0,NULL,NULL),(34,'test','$2a$10$ozwCHpePh3Cl64bomQY2nOb9XpzM7zlMA5KJG5CEhISTAh7zitFsy','2018-06-13 15:09:32','2017-05-14 21:08:47',NULL,0,NULL,NULL),(2147483648,'qwexwe','$2a$10$qmRpnvIFJV8OUO5iCDWNG.waDuKnWewebFBBjgIR/OHeqrmzqbiZ2',NULL,NULL,1,1,'系统管理员',NULL),(2147483649,'qweqw','$2a$10$5P.n2xkBGexbtVldY50rDesi7Rx0222xUVBoePsHK3gbe3P/T3rru',NULL,NULL,1,1,'系统管理员',NULL);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
