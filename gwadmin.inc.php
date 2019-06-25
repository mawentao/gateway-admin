<?php
if (!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
require_once dirname(__FILE__)."/class/env.class.php";
$plugin_path = gwadmin_env::get_plugin_path();
$setting = C::m('#gwadmin#gwadmin_setting')->get();
unset($setting['db_gateway']['user']);
unset($setting['db_gateway']['pass']);
$embedded = isset($_GET['embedded']) ? 1 : 0;

try {
    //1. 登录检查
    if(!$_G['uid']){
        $login = gwadmin_env::get_siteurl()."/member.php?mod=logging&action=login";
        $login.= "&referto=".urlencode(gwadmin_env::get_request_url());
        header("Location: $login");
        exit();
    }

    //2. 权限检查
    $auth = C::t('#gwadmin#gwadmin_auth')->getByUid($_G['uid']);
    if ($auth<=0) {
        throw new Exception('很抱歉,您没有权限访问此页面,请联系管理员开通权限!');
    }

    //3. 导航菜单
    $nav = C::m('#gwadmin#gwadmin_nav_setting')->getEnabledNavMenu();

    //4. 加载模板
    $filename = basename(__FILE__);
    list($controller) = explode('.',$filename);
    include template("gwadmin:".strtolower($controller));
    gwadmin_env::getlog()->trace("pv[".$_G['username']."|uid:".$_G['uid']."]");
    C::t('#gwadmin#gwadmin_log')->write("visit gwadmin:$controller");
} catch (Exception $e) {
    $msg = $e->getMessage();
    include template("gwadmin:error");
}
