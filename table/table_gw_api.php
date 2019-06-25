<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 网关API表
 **/
class table_gw_api
{
	private $_pdo;
	private $_table = "gw_api";

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
		$app_id= gwadmin_validate::getNCParameter('app_id','app_id','integer'); 
		$state = gwadmin_validate::getNCParameter('state','state','integer'); 
        $sort  = gwadmin_validate::getOPParameter('sort','sort','string',1024,'ctime');
        $dir   = gwadmin_validate::getOPParameter('dir','dir','string',1024,'DESC');
        $start = gwadmin_validate::getOPParameter('start','start','integer',1024,0);
        $limit = gwadmin_validate::getOPParameter('limit','limit','integer',1024,20);
		$where = "a.app_id='$app_id' AND a.isdel=0";
		if ($state!=-1) $where.=" AND a.status='$state'";
		if ($key!="") $where.=" AND (a.front_path like '%$key%')";
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
			'app_id' => gwadmin_validate::getNCParameter('app_id','app_id','integer'),
            'front_path' => gwadmin_validate::getNCParameter('front_path','front_path','string',128),
            'back_path' => gwadmin_validate::getNCParameter('back_path','back_path','string',128),
            'timeout' => gwadmin_validate::getNCParameter('timeout','timeout','integer'),
            'max_flow' => gwadmin_validate::getNCParameter('max_flow','max_flow','integer'),
            'authkeys' => gwadmin_validate::getNCParameter('authkeys','authkeys','string',256),
            'is_mock' => gwadmin_validate::getNCParameter('is_mock','is_mock','integer'),
            'mock' => gwadmin_validate::getNCParameter('mock','mock','string',4096),
            'remark' => gwadmin_validate::getNCParameter('remark','remark','string',200),
        );
		$pdo = $this->_pdo;
		/////////////////////////////////
		// front_path校验
		$appid = $record['app_id'];
		$front_path = $record['front_path'];
		$sql = "select * from ".$this->_table." where front_path='$prepath' AND app_id='$appid' AND id!=$id";
		$rd = $pdo->queryFirst($sql);
		if (!empty($rd)) {
			throw new Exception("网关接口 $front_path 已存在");
		}
		/////////////////////////////////
        if ($id==0) {
			$record['uid'] = $uid;
            $record['ctime'] = date('Y-m-d H:i:s');
			$record['status'] = 0;
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

	// 设置状态
	public function setStatus()
	{/*{{{*/
		global $_G;
		$uid = $_G['uid'];
		$id = gwadmin_validate::getNCParameter('id','id','integer');
		$status = gwadmin_validate::getNCParameter('status','status','integer');
		$rd = $this->getById($id);
		if (empty($rd)) return 0;
		if ($rd['uid']!=$uid) throw new Exception('非法操作');
		$sql = "update ".$this->_table." set status='$status' where id='$id' AND uid='$uid'";
		return $this->_pdo->exec($sql);
	}/*}}}*/

	// 保存服务地址
	public function saveBackpath()
	{/*{{{*/
		global $_G;
		$uid = $_G['uid'];
		$id = gwadmin_validate::getNCParameter('id','id','integer');
		$back_path = gwadmin_validate::getNCParameter('back_path','back_path','string',128);
		$rd = $this->getById($id);
		if (empty($rd)) return 0;
		if ($rd['uid']!=$uid) throw new Exception('非法操作');
		$sql = "update ".$this->_table." set back_path='$back_path' where id='$id' AND uid='$uid'";
		return $this->_pdo->exec($sql);
	}/*}}}*/

}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
