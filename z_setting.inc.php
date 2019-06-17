<?php
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
    exit('Access Denied');
}
require_once dirname(__FILE__).'/class/env.class.php';

// 插件设置
$params = C::m('#gwadmin#gwadmin_setting')->get();

// 保存设置
if (isset($_POST["reset"])) {
	if ($_POST["reset"]==1) {
		$params = array();
	} else {
		foreach ($params as $k => &$v) {
			if (isset($_POST[$k])) $v=$_POST[$k];
		}
		// 网关DB: gateway
		$params['db_gateway'] = array (
			'host' => $_POST['gateway_host'],
			'port' => $_POST['gateway_port'],
			'user' => $_POST['gateway_user'],
			'pass' => $_POST['gateway_pass'],
			'db'   => $_POST['gateway_db'],
		);
	}
    C::t('common_setting')->update("gwadmin_config",$params);
    updatecache('setting');
    $landurl = 'action=plugins&operation=config&do='.$pluginid.'&identifier=gwadmin&pmod=z_setting';
	cpmsg('plugins_edit_succeed', $landurl, 'succeed');
}

$params['ajaxapi'] = gwadmin_env::get_plugin_path()."/index.php?version=4&module=";
$tplVars = array(
    'siteurl' => gwadmin_env::get_siteurl(),
    'plugin_path' => gwadmin_env::get_plugin_path(),
    'plugin_name' => 'gwadmin',
);
gwadmin_utils::loadtpl(dirname(__FILE__).'/template/views/z_setting.tpl', $params, $tplVars);
gwadmin_env::getlog()->trace("show admin page [z_setting] success");
