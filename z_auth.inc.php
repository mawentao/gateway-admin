<?php
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
    exit('Access Denied');
}
require_once dirname(__FILE__).'/class/env.class.php';
$params = array(
	'ajaxapi' => gwadmin_env::get_plugin_path()."/index.php?version=4&module=",
);
$tplVars = array(
    'plugin_path' => gwadmin_env::get_plugin_path(),
    'plugin_name' => 'gwadmin',
	'pluginurl' => gwadmin_env::get_siteurl()."/plugin.php?id=gwadmin",
);
gwadmin_utils::loadtpl(dirname(__FILE__).'/template/views/z_auth.tpl', $params, $tplVars);
