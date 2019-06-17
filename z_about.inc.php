<?php
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
    exit('Access Denied');
}
require_once dirname(__FILE__).'/class/env.class.php';

$params = array (
	'siteurl' => gwadmin_env::get_siteurl(),
);
$tplVars = array(
    'siteurl'     => gwadmin_env::get_siteurl(),
    'plugin_path' => gwadmin_env::get_plugin_path(),
	'plugin_dir'  => dirname(__FILE__),
    'plugin_name' => 'gwadmin', 
	'php_bin'     => PHP_BINDIR."/php",
);
gwadmin_utils::loadtpl(dirname(__FILE__).'/template/views/z_about.tpl', $params, $tplVars);
gwadmin_env::getlog()->trace("show admin page [z_about] success");
