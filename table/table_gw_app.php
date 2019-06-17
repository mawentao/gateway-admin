<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 网关应用表
 **/
class table_gw_app
{
	private $_pdo;
	private $_table = "gw_app";

	public function __construct() {
		$this->_pdo = gwadmin_env::getpdo('db_gateway');
	}

	// 根据id获取网关应用记录
	public function getById($id)
	{/*{{{*/
		$sql = "select * from ".$this->_table." where id=$id AND isdel=0";
		return $this->_pdo->queryFirst($sql);
	}/*}}}*/

	// 管理后台查询接口
	public function query()
	{/*{{{*/
		$return = array(
            "totalProperty" => 0,
            "root" => array(),
        );
		$key   = gwadmin_validate::getNCParameter('key','key','string'); 
		$state = gwadmin_validate::getNCParameter('state','state','integer'); 
        $sort  = gwadmin_validate::getOPParameter('sort','sort','string',1024,'ctime');
        $dir   = gwadmin_validate::getOPParameter('dir','dir','string',1024,'DESC');
        $start = gwadmin_validate::getOPParameter('start','start','integer',1024,0);
        $limit = gwadmin_validate::getOPParameter('limit','limit','integer',1024,20);
		$where = "a.isdel=0";
		if ($state!=-1) $where.=" AND a.status='$state'";
		if ($key!="") $where.=" AND (a.name like '%$key%' OR a.prepath like '%$key%')";
		$table = $this->_table;
		$sql = <<<EOF
SELECT SQL_CALC_FOUND_ROWS a.*
FROM $table as a 
WHERE $where ORDER BY $sort $dir LIMIT $start,$limit
EOF;
        $return["root"] = $this->_pdo->queryAll($sql);
        $row = $this->_pdo->queryFirst("SELECT FOUND_ROWS() AS total");
        $return["totalProperty"] = $row["total"];
        /////////////////////////////////////////////
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
        /////////////////////////////////////////////
        return $return;
	}/*}}}*/

	// 保存
	public function save()
	{/*{{{*/
		global $_G;
        $uid = $_G['uid'];
        $id = gwadmin_validate::getNCParameter('id','id','integer');
        $record = array (
            'name' => gwadmin_validate::getNCParameter('name','name','string',1024),
            'prepath' => gwadmin_validate::getNCParameter('prepath','prepath','string',1024),
            'remark' => gwadmin_validate::getNCParameter('remark','remark','string',1024),
            'owners' => gwadmin_validate::getNCParameter('owners','owners','string',1024),
            'status' => gwadmin_validate::getNCParameter('status','status','integer',1024),
        );
		$pdo = $this->_pdo;
		/////////////////////////////////
		// prepath校验
		$prepath = trim($record['prepath'],"/");
		if (preg_match("/^system/i", $prepath)) {
			throw new Exception("禁止使用 /system 前缀");
		}
		$prepath = "/$prepath";
		$sql = "select * from ".$this->_table." where prepath='$prepath' AND id!=$id";
		$rd = $pdo->queryFirst($sql);
		if (!empty($rd)) {
			throw new Exception("公共前缀 $prepath 已存在");
		}
		$record['prepath'] = $prepath;
		/////////////////////////////////
        if ($id==0) {
			$record['uid'] = $uid;
            $record['ctime'] = date('Y-m-d H:i:s');
            return $this->_pdo->insert($this->_table,$record);
        } else {
            return $this->_pdo->update($this->_table,$record,array("id='$id'"));
        }
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
