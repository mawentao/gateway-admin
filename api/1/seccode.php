<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * 图文验证码
 * URL: dzroot/source/plugin/gwadmin/index.php?version=1&module=seccode
 **/
$sc = C::m('#gwadmin#gwadmin_seccode');
/*
//debug
if (isset($_GET['seccode'])) {
	var_dump($sc->check($_GET['seccode']));
	die(0);
}
//*/
$code = $sc->mkcode(4,false);
$sc->display($code,120,40);
?>
