<?php
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
require_once 'dbo.class.php';
require_once 'log.class.php';
require_once 'http.class.php';
require_once 'cache.class.php';
require_once 'utils.class.php';
require_once 'validate.class.php';
class gwadmin_env
{
    private static $_log_obj = null;

	// get discuz site's url(discuz root)
    public static function get_siteurl()
    {/*{{{*/
        global $_G;
		$_G['siteurl'] = preg_replace("/source\/plugin\/gwadmin/i","", $_G['siteurl']);
		return rtrim($_G['siteurl'], '/');
    }/*}}}*/

    // 获取当前请求的url地址 
    public static function get_request_url()
    {/*{{{*/
        return 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
    }/*}}}*/

	// get sitename(utf-8)
    public static function get_sitename()
    {/*{{{*/
        global $_G;
        $sitename = $_G["setting"]["sitename"];
        $charset = strtolower($_G['charset']);
        if ($charset=='gbk') {
            $sitename = gwadmin_utils::toutf8($sitename);
        }
        return $sitename;
    }/*}}}*/

    // get admin-email
    public static function get_admin_email()
    {/*{{{*/
        global $_G;
        return $_G["setting"]["adminemail"];
    }/*}}}*/

    // get current plugin path
    public static function get_plugin_path()
    {/*{{{*/
        return self::get_siteurl().'/source/plugin/gwadmin';
    }/*}}}*/

    // api output
    public static function result(array $result,$json_header=true)
    {/*{{{*/
        header("Content-type: application/json");
        if (!isset($result['retcode'])) {
            $result['retcode'] = 0;
        }
        if (!isset($result['retmsg'])) {
            $result['retmsg'] = 'succ';
        }
		if ($json_header) {
            header("Content-type: application/json");
		}
        echo json_encode($result);
        exit;
    }/*}}}*/

    // get request param
    public static function get_param($key, $dv=null, $field='request')
    {/*{{{*/
        if ($field=='GET') {
            return isset($_GET[$key]) ? $_GET[$key] : $dv;
        }
        else if ($field=='POST') {
            return isset($_POST[$key]) ? $_POST[$key] : $dv;
        }
        else {
            return isset($_REQUEST[$key]) ? $_REQUEST[$key] : $dv;
        }
    }/*}}}*/
    
    // get log object
    public static function getlog()
    {/*{{{*/
        if (!self::$_log_obj) {
            $logcfg = array('log_level'=>16);
            self::$_log_obj = new gwadmin_log($logcfg);
        }   
        return self::$_log_obj;
    }/*}}}*/

    // 获取外部dbo
    private static $_pdo_objs = array();
    public static function getpdo($key)
    {/*{{{*/
        if (!isset(self::$_pdo_objs[$key])) {
            $config = C::m("#gwadmin#gwadmin_setting")->get();
            if (!isset($config[$key])) {
                throw new Exception("can_not_find_db_setting:$key");
            }
            $dbconf = $config[$key];
            $host = $dbconf['host'];
            $port = $dbconf['port'];
            $user = $dbconf['user'];
            $pass = $dbconf['pass'];
            $db   = $dbconf['db'];
            self::$_pdo_objs[$key] = new gwadmin_dbo($host,$port,$user,$pass,$db);
        }
        return self::$_pdo_objs[$key];
    }/*}}}*/
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
