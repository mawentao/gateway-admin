<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * discuz common_member
 **/
class model_gwadmin_common_member
{
    public function __construct() {
    }

    // 获取一个或一批uid的用户信息(dzuid)
    public function getMapByUids($uids)
    {/*{{{*/
        $resMap = array();
        if (!is_array($uids)) {
            $uids = array($uids);
        }
        $idstr = implode(",",$uids);
        $table_common_member = DB::table('common_member');
        $sql = <<<EOF
SELECT uid,username,email
FROM $table_common_member
WHERE uid IN ($idstr)
EOF;
        $res = DB::fetch_all($sql);
        foreach ($res as &$row) {
            $resMap[$row['uid']] = $row;
        }
        return $resMap;
    }/*}}}*/
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
