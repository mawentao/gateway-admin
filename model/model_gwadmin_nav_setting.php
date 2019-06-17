<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
/**
 * 导航设置 
 * C::m('#gwadmin#gwadmin_nav_setting')->get()
 **/
class model_gwadmin_nav_setting
{
    private $cfgkey = "gwadmin_navmenu";

	// 获取默认配置
    public function get_default_setting()
    {
        $setting = array (
            // 导航菜单
            'navmenu' => array (
                array('newtab'=>0,'enable'=>1,'text'=>'首页','icon'=>'sicon-home','href'=>'#/'),
                array('newtab'=>0,'enable'=>1,'text'=>'接口管理','icon'=>'sicon-vector','href'=>'#/api'),
            )
        );
		return $setting;
    }

    // 获取配置
    public function get() 
    {/*{{{*/
        $setting = $this->get_default_setting();
        global $_G;
        $cfgkey = $this->cfgkey;
        if (isset($_G['setting'][$cfgkey])) {
            $config = unserialize($_G['setting'][$cfgkey]);
            foreach ($setting as $k => &$v) {
                if (isset($config[$k])) {
                    $v = $config[$k];
                }
            }
        }
        return $setting;
    }/*}}}*/

    // 获取启用的导航菜单列表
    public function getEnabledNavMenu()
    {/*{{{*/
        $nav = $this->get();
        $res = array();
        foreach ($nav['navmenu'] as $im) {
            if ($im['enable']!=1) continue;
            $navItem = array (
                'icon' => $im['icon'],
                'text' => $im['text'],
                'href' => $im['href'],
                'newtab' => $im['newtab'],
                'subitems' => array(),
            );
            if (!empty($im['subitems'])) {
                foreach ($im['subitems'] as $sim) {
                    if ($sim['enable']!=1) continue;
                    $navItem['subitems'][] = gwadmin_utils::getvalues($sim,array('icon','text','href','newtab'));
                }
            }
            $res[] = $navItem;
        }
        return $res;
    }/*}}}*/

    // 恢复默认配置
    public function reset()
    {
        C::t('common_setting')->delete($this->cfgkey);
        updatecache('setting');
    }

    // 保存配置
    public function set(&$setting)
    {
        C::t('common_setting')->update($this->cfgkey,$setting);
        updatecache('setting');
    }
	
}
// vim600: sw=4 ts=4 fdm=marker syn=php
?>
