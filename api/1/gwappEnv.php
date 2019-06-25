<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * 网关APP环境
 **/
////////////////////////////////////
// API鉴权
authLogin();
////////////////////////////////////

// 网关应用列表查询接口
function queryAction() { return C::t('#gwadmin#gw_app_env')->query(); }

// 保存网关应用接口
function saveAction() { return C::t('#gwadmin#gw_app_env')->save(); }

// 网关应用删除接口
function removeAction() { return C::t('#gwadmin#gw_app_env')->remove(); }

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
