<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 网关鉴权表
 **/
class table_gw_api_auth
{
	private $_pdo;
	private $_table = "gw_api_auth";

	public function __construct() {
		$this->_pdo = gwadmin_env::getpdo('db_gateway');
	}

	// 获取网关鉴权列表选项
	public function getOptions()
	{
		$sql = "SELECT name as text,authkey as value FROM ".$this->_table." WHERE isdel=0 ORDER BY id ASC";
		return $this->_pdo->queryAll($sql);
	}
}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
