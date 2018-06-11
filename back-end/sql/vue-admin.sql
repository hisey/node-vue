# Host: localhost  (Version 5.7.22-log)
# Date: 2018-06-11 18:12:36
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "admin_role"
#

DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL COMMENT '角色名称',
  `status` tinyint(3) DEFAULT '1' COMMENT '角色状态',
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='后台角色';

#
# Data for table "admin_role"
#


#
# Structure for table "admin_user"
#

DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `status` tinyint(3) NOT NULL DEFAULT '1' COMMENT '用户状态 1正常  0禁用',
  `role_name` varchar(50) DEFAULT NULL COMMENT '分类名',
  `pic` varchar(64) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8 COMMENT='后台用户';

#
# Data for table "admin_user"
#

/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (26,'root','$2a$10$RREavyfC7Pm1EXYIjcZS6.Ec3qMVveuwMm.GcXoCZOSMbNkxfYVLW','2017-05-09 23:14:07','2017-05-09 23:14:07',NULL,1,NULL,NULL),(27,'666','$2a$10$soVuVqbLSWwliu/6MT0xQ.3VLbXK2FRZhij/50Ni3E5SGwGaVb.ou','2017-05-09 23:38:06','2017-05-13 14:47:04',NULL,1,NULL,NULL),(34,'test','$2a$10$ozwCHpePh3Cl64bomQY2nOb9XpzM7zlMA5KJG5CEhISTAh7zitFsy','2017-05-13 14:58:47','2017-05-14 21:08:47',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;

#
# Structure for table "goods"
#

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `name` varchar(50) DEFAULT '' COMMENT '名称',
  `price` float NOT NULL DEFAULT '0' COMMENT '价格',
  `inventory` int(11) NOT NULL DEFAULT '0' COMMENT '库存',
  `imgs` varchar(255) DEFAULT '' COMMENT '图片',
  `onsale` varchar(15) NOT NULL DEFAULT '0' COMMENT '属性（1、推荐，2、优选，3、折扣，4、热门）',
  `shelf` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否上架（1、是，0、否）',
  `category_id` int(11) DEFAULT NULL COMMENT '所属分类id',
  `cover` varchar(255) DEFAULT NULL COMMENT '商品封面',
  `category_name` varchar(50) DEFAULT NULL COMMENT '分类名',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1185 DEFAULT CHARSET=utf8 COMMENT='商品';

#
# Data for table "goods"
#

/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1185,'2018-06-11 17:33:00',NULL,'苹果3斤',14.99,300,'/goodsPic/hut7X7CVqsU8ZX8KL62FvYMW.jpg,/goodsPic/p5WSwXqkC8aTH66rOqeOgAh5.jpg,/goodsPic/uO0DUING5XhHSOpnnkcIMChB.jpg','2,4',1,12,'/goodsPic/mRtjrLn_IIlYYmzhPn8wwOf5.jpg','水果'),(1186,'2018-06-11 17:33:00',NULL,'梨子2斤',10.99,400,'/goodsPic/Q-oYIUX-PZrNBdGc8cZUt17p.jpg,/goodsPic/K-KfM-jG4CAZ5C2bXFqY4yNt.jpg,/goodsPic/_eJD6EHb3GiotBqWD8Kb6MBa.jpg','2,1',1,12,'/goodsPic/QgodsvUzH_12uHwHZ-qD04RL.jpg','水果');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;

#
# Structure for table "goods_category"
#

DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '分类名',
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `shelf` tinyint(3) NOT NULL DEFAULT '0' COMMENT '是否上架',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='商品分类';

#
# Data for table "goods_category"
#

/*!40000 ALTER TABLE `goods_category` DISABLE KEYS */;
INSERT INTO `goods_category` VALUES (12,'水果','2018-06-11 17:06:00',NULL,1);
/*!40000 ALTER TABLE `goods_category` ENABLE KEYS */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `role` tinyint(3) NOT NULL DEFAULT '0' COMMENT '用户权限',
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8 COMMENT='前台用户';

#
# Data for table "user"
#

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (26,'root','$2a$10$RREavyfC7Pm1EXYIjcZS6.Ec3qMVveuwMm.GcXoCZOSMbNkxfYVLW',100,'2017-05-09 23:14:07','2017-05-09 23:14:07'),(27,'666','$2a$10$soVuVqbLSWwliu/6MT0xQ.3VLbXK2FRZhij/50Ni3E5SGwGaVb.ou',1,'2017-05-09 23:38:06','2017-05-13 14:47:04'),(34,'test','$2a$10$ozwCHpePh3Cl64bomQY2nOb9XpzM7zlMA5KJG5CEhISTAh7zitFsy',10,'2017-05-13 14:58:47','2017-05-14 21:08:47');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
