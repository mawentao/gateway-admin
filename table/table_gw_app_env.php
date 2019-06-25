<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 网关应用服务环境表
 **/
class table_gw_app_env
{
	private $_pdo;
	private $_table = "gw_app_env";

	public function __construct() {
		$this->_pdo = gwadmin_env::getpdo('db_gateway');
	}

	// 根据网关应用id获取全部环境列表
	public function getAllByAppId($id)
	{/*{{{*/
		$sql = "select * from ".$this->_table." where app_id=$id AND isdel=0 ORDER BY ctime ASC";
		return $this->_pdo->queryAll($sql);
	}/*}}}*/

	// 管理后台查询接口
	public function query()
	{/*{{{*/
		$return = array(
            "totalProperty" => 0,
            "root" => array(),
        );
		$key   = gwadmin_validate::getNCParameter('key','key','string'); 
		$appid = gwadmin_validate::getNCParameter('appid','appid','integer'); 
        $sort  = gwadmin_validate::getOPParameter('sort','sort','string',1024,'ctime');
        $dir   = gwadmin_validate::getOPParameter('dir','dir','string',1024,'ASC');
        $start = gwadmin_validate::getOPParameter('start','start','integer',1024,0);
        $limit = gwadmin_validate::getOPParameter('limit','limit','integer',1024,20);
		$where = "a.app_id='$appid' AND a.isdel=0";
		if ($key!="") $where.=" AND (a.name like '%$key%')";
		$table = $this->_table;
		$sql = <<<EOF
SELECT SQL_CALC_FOUND_ROWS a.*
FROM $table as a 
WHERE $where ORDER BY $sort $dir LIMIT $start,$limit
EOF;
        $return["root"] = $this->_pdo->queryAll($sql);
        $row = $this->_pdo->queryFirst("SELECT FOUND_ROWS() AS total");
        $return["totalProperty"] = $row["total"];
/*        /////////////////////////////////////////////
        // 创建人
        if (!empty($return['root'])) {
            $uids = array();
            foreach ($return['root'] as &$item) {
                $uids[] = $item['uid'];
            }
            $uidMap = C::m('#gwadmin#gwadmin_common_member')->getMapByUids($uids);
            foreach ($return['root'] as &$item) {
                $uid = $item['uid'];
                $item['username'] = '';
                if (isset($uidMap[$uid])) $item['username'] = $uidMap[$uid]['username'];
            }
        }
        /////////////////////////////////////////////*/
        return $return;
	}/*}}}*/


	// 保存
	public function save()
	{/*{{{*/
		global $_G;
        $uid = $_G['uid'];
        $id = gwadmin_validate::getNCParameter('id','id','integer');
		$appid = gwadmin_validate::getNCParameter('app_id','app_id','integer',1024);
		$envname = gwadmin_validate::getNCParameter('name','name','string',1024);
		$url = gwadmin_validate::getNCParameter('url','url','string',1024);
		$pdo = $this->_pdo;
		/////////////////////////////////
		// name校验
		$sql = "select * from ".$this->_table." where name='$envname' AND app_id='$appid' AND id!=$id AND isdel=0";
		$rd = $pdo->queryFirst($sql);
		if (!empty($rd)) {
			throw new Exception("环境 $envname 已存在");
		}
		/////////////////////////////////
		$table = $this->_table;
		$ctime = date('Y-m-d H:i:s');
		$sql = <<<EOF
INSERT INTO $table (`app_id`,`name`,`url`,`uid`,`ctime`,`isdel`) VALUES
('$appid','$envname','$url','$uid','$ctime','0') 
ON DUPLICATE KEY UPDATE 
url=values(url),uid=values(uid),isdel=values(isdel)
EOF;
		return $this->_pdo->exec($sql);
	}/*}}}*/

	// 删除
	public function remove()
	{/*{{{*/
		global $_G;
		$uid = $_G['uid'];
		$id = gwadmin_validate::getNCParameter('id','id','integer');
		$rd = $this->getById($id);
		if (empty($rd)) return 0;
		if ($rd['uid']!=$uid) throw new Exception('非法操作');
		$sql = "update ".$this->_table." set isdel=1 where id='$id' AND uid='$uid'";
		return $this->_pdo->exec($sql);
	}/*}}}*/

}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
