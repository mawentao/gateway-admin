<?php
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
/**
 * 缓存
 * 使用demo:
 *    $data = gwadmin_cache::call("key",function(){
 *        return "value";
 *    },60);
 **/
class gwadmin_cache
{
    private static $_cache_key_prefix = 'gwadmin:';

    private static function _get_cache_key($key)
    {/*{{{*/
        return self::$_cache_key_prefix.$key;
    }/*}}}*/

    // 是否启用缓存机制
    private static function _is_enable()
    {/*{{{*/
        $setting = C::m('#gwadmin#gwadmin_setting')->get();
        return $setting['cache_enable']==1;
    }/*}}}*/

    // 先查缓存,mis后调用函数
    public static function call($cacheKey,$func,$timeout=60) 
    {/*{{{*/
        if (!self::_is_enable()) {
            return $func();
        }

        global $_G;
        //1. 加载cache
        $cacheName = self::_get_cache_key($cacheKey);
        if (!isset($_G['cache'][$cacheName])) {
            loadcache($cacheName);
        }

        //2. 命中cache且未过期
        if (!empty($_G['cache'][$cacheName])) {
            $cacheData = $_G['cache'][$cacheName];
            $cacheTime = $cacheData['time'];
            $diff = time() - $cacheTime;
            if ($diff<$timeout) {
                return $cacheData['data'];
            }
        }

        //3. 调用函数,并存储cache
        if ($func) {
            $cacheData = array (
                'data' => $func(),
                'time' => time(),
            );
            savecache($cacheName, $cacheData);
            return $cacheData['data'];
        }

        return null;
    }/*}}}*/

}

?>
