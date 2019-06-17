<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * 管理后台
 **/
////////////////////////////////////
// API鉴权
authLogin();
authUsergroup(array(1));
////////////////////////////////////

// 权限管理查询接口
function authQueryAction()
{
	return C::t('#gwadmin#gwadmin_auth')->query();
}

// 权限设置接口
function authSetAction()
{
	return C::t('#gwadmin#gwadmin_auth')->set();
}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
