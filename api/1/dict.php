<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * 字典
 **/
////////////////////////////////////
// API鉴权
authLogin();
////////////////////////////////////

/**
 * 获取筛选项列表
 *    返回数据格式: [{text:'男',value:0},{text:'女',value:1}]
 **/
function getOptionsAction()
{
    $res = array();
    $key = gwadmin_validate::getNCParameter('key','key','string',1024);
    switch ($key) {
        //case 'city': return C::t('#gwadmin#gwadmin_city')->getOptions();
        default: break;
    }   
    return $res;
}

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
