<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * discuz gwapp
 **/
class model_gwadmin_gwapp
{
    public function __construct() {
    }

    // 获取网关应用详情
    public function getDetail($id)
    {/*{{{*/
		$appInfo = C::t('#gwadmin#gw_app')->getById($id);
		if (empty($appInfo)) {
			throw new Exception("该网关应用不存在或已删除");
		}
		// 获取后端服务环境列表
		$envList = C::t('#gwadmin#gw_app_env')->getAllByAppId($id);
		/*
		$envMap = array();
		foreach ($envList as &$env) {
			$envMap[$env['name']] = $env['url'];
		}*/
		$appInfo['env'] = $envList; //$envMap;
        return $appInfo;
    }/*}}}*/

}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
