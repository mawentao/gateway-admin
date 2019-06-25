<?php
/**
 * API入口
 **/
define("IN_GWADMIN_API", 1);
define("GWADMIN_PLUGIN_PATH", dirname(__FILE__));
chdir("../../../");

// initdz
require './source/class/class_core.php';
$discuz = C::app();
$discuz->init();
require_once GWADMIN_PLUGIN_PATH."/class/env.class.php";
$module = isset($_GET['module']) ? $_GET['module'] : ''; 
$action = isset($_GET['action']) ? $_GET['action'] : ''; 
$version = !empty($_GET['version']) ? intval($_GET['version']) : 1;
if($version>4) $version=4;
$retcode = 0;

try {
    //1. 注册API模块
    $modules = array (
        'admin','seccode','uc','dict',
		'gwapp','gwappEnv','gwapi',
    );
    if(!in_array($_GET['module'], $modules)) {
        throw new Exception("module not found[$module]");
    }
	//2. 从高到低遍历版本
    while ($version>=1) {
        $apifile = GWADMIN_PLUGIN_PATH."/api/$version/$module.php";
        if(file_exists($apifile)) {
            require_once $apifile;
			$actionFun = $action."Action";
            if (!function_exists($actionFun)) {
                throw new Exception("unkown action[$action] in api module[$module]");
            }   
            $res = $actionFun();
            gwadmin_env::result(array("data"=>$res));
            exit(0);
        }
        --$version; 
    }
    //3. 找不module文件
    throw new Exception("module not found[$module]");
} catch (Exception $e) {
	if ($retcode==0) $retcode = 1001;
    gwadmin_env::result(array('retcode'=>$retcode,'retmsg'=>$e->getMessage()));
}

// 登录鉴权
function authLogin()
{/*{{{*/
    global $_G,$retcode;
    if ($_G['uid']==0) {
        $retcode = 1002;
        throw new Exception("please login");
    }
}/*}}}*/

// 用户组鉴权
function authUsergroup(array $groupids)
{/*{{{*/
    global $_G,$retcode;
    $groupid = $_G["groupid"];
    if (!empty($groupids) && !in_array($groupid,$groupids)) {
        $retcode = 1003;
        throw new Exception('illegal request');
    }
}/*}}}*/

?>
