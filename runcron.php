#!/usr/bin/env php
<?php
/**
 * 计划任务执行入口
 **/
define("CUR_PATH", dirname(__FILE__));

// 初始化discuz上下文
// 注意:此步骤会清楚所有定义的全局变量
function init_discuz_context()
{
	require_once CUR_PATH.'/../../../source/class/class_core.php';
	$discuz = C::app();
	$discuz->init();
	require_once CUR_PATH."/class/env.class.php";
}

// 获取统计日期
function get_stat_day()
{
	$day = date("Ymd",time()-86400);
	$args = explode(' ',CRON_SCRIPT_ARGS);
	if (!empty($args) && $args[0]!='') {
		$tm = strtotime($args[0]);
		$day = date("Ymd",$tm);
	}
	return $day;
}


// array转成insert语句
function objToInsertValues(&$arr)
{/*{{{*/
    $vs = array();
    foreach ($arr as $k => $v) {
        $vs[] = "'$v'";
    }
    return "(".implode(',',$vs).")";
}/*}}}*/


if (__FILE__ == realpath($_SERVER['SCRIPT_FILENAME']))
{
	error_reporting(E_ALL);
	//1. check args
	if (!isset($argv[1]) || $argv[1]=="") {
        $exe = $argv[0];
        echo "[usage]: php $exe SCRIPT_NAME\n";
        exit(0);
    }
	$args = array();
	for ($i=2;$i<count($argv);++$i) {
		$args[] = $argv[$i];
	}
	define('CRON_SCRIPT_ARGS',implode(' ',$args));
	//2. check script file
	define('CRON_SCRIPT_NAME',$argv[1]);
	if (is_file(CRON_SCRIPT_NAME)) {
		define('CRON_SCRIPT_FILE',CRON_SCRIPT_NAME);
	} else {
		define('CRON_SCRIPT_FILE',CUR_PATH."/cron/".CRON_SCRIPT_NAME.".inc.php");
	}
	if (!is_file(CRON_SCRIPT_FILE)) {
		die("[Error] script file does not exist: ".CRON_SCRIPT_FILE."\n");
	}
	//3. init
	init_discuz_context();
	//4. run
	include_once(CRON_SCRIPT_FILE);
}


// vim600: sw=4 ts=4 fdm=marker syn=php
?>
