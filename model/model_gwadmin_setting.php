<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 插件设置 
 * C::m('#gwadmin#gwadmin_setting')->get()
 **/
class model_gwadmin_setting
{
	// 获取默认配置
    public function getDefault()
    {
		$setting = array (
			// 屏蔽所有discuz页面
			'disable_discuz' => 0,
			// 系统名称
			'page_title' => 'GW网关管理',
			// 版权信息
			'page_copyright' => 'mawentao.com 2018',
            // 折叠导航菜单
            'fold_navmenu' => 0,
            // 启用缓存
            'cache_enable' => 1,
			// 网关DB: gateway
            'db_gateway' => array (
                'host' => '127.0.0.1',
                'port' => '3306',
                'user' => 'root',
                'pass' => 'root',
                'db' => 'gateway',
            ),
		);
		return $setting;
    }

    // 获取配置
	public function get()
	{
		$setting = $this->getDefault();
		global $_G;
		if (isset($_G['setting']['gwadmin_config'])){
			$config = unserialize($_G['setting']['gwadmin_config']);
			foreach ($setting as $key => &$item) {
				if (isset($config[$key])) $item = $config[$key];
			}
		}
		return $setting;
	}
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
