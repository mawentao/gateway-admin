<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * UC模块
 **/
////////////////////////////////////
// API鉴权
////////////////////////////////////

// 登录
function loginAction()
{/*{{{*/
	//1. 校验验证码
	$seccode = gwadmin_validate::getNCParameter('seccode','seccode','string',1024); 
    if (!C::m('#gwadmin#gwadmin_seccode')->check($seccode)) {
        throw new Exception("验证码错误");
    }
    //2. 请求参数校验
    global $_G;
    $username = gwadmin_validate::getNCParameter('username','username','string',1024);
    $password = gwadmin_validate::getNCParameter('userpass','userpass','string',1024);
    $questionid = 0; //gwadmin_validate::getNCParameter('questionid','questionid','integer');
    $answer = ''; //gwadmin_validate::getNCParameter('answer','answer','string');
    $username = iconv('UTF-8', CHARSET.'//ignore', urldecode($username));
    $answer = iconv('UTF-8', CHARSET.'//ignore', urldecode($answer));
    //3. 登录校验
    $uid = C::m("#gwadmin#gwadmin_uc")->logincheck($username, $password, $questionid, $answer);
    if (!is_numeric($uid)) {
        throw new Exception($uid);
    }   
    //4. 登录
    C::m("#gwadmin#gwadmin_uc")->dologin($uid);
    $result = array (
        "username" => $username,
        "uid" => $uid,
    );
    return $result;
}/*}}}*/

// 退出
function logoutAction()
{/*{{{*/
	C::m("#gwadmin#gwadmin_uc")->logout();
	$jumpurl = gwadmin_env::get_siteurl()."/plugin.php?id=gwadmin";
	header('Location: '.$jumpurl);
}/*}}}*/

// 修改密码
function changepassAction()
{/*{{{*/
	//1. 校验验证码
	$seccode = gwadmin_validate::getNCParameter('seccode','seccode','string',1024); 
    if (!C::m('#gwadmin#gwadmin_seccode')->check($seccode)) {
        throw new Exception("验证码错误");
    }
	//2. 校验旧密码
	global $uid,$username;
	$oldpass = gwadmin_validate::getNCParameter('oldpass','oldpass','string',1024);
	$newpass = gwadmin_validate::getNCParameter('newpass','newpass','string',1024);
	if (strlen($newpass)<6) {
		throw new Exception('新密码长度至少6个字符以上');
	}
	$uc = C::m('#gwadmin#gwadmin_uc');
	if (!$uc->check_user_password($uid,$oldpass)) {
		throw new Exception('旧密码错误');
	}
	//3. 修改密码
	if (!$uc->update_user_password($username,$newpass)) {
		throw new Exception('不明原因修改失败');
	}
	return 0;
}/*}}}*/

// 我的资料
function profileAction()
{/*{{{*/
    global $_G;
	$uid = $_G['uid'];
	if ($uid==0) throw new Exception("please login");
	$member = gwadmin_utils::getvalues($_G['member'],array('uid','username','email'));
	$group = gwadmin_utils::getvalues($_G['group'],array('groupid','grouptitle'));
	$sql = "select realname,gender,mobile from ".DB::table('common_member_profile')." where uid=$uid";
	$profile = DB::fetch_first($sql);
	$data = array_merge($member,$group,$profile);
    return $data;
}/*}}}*/

// 设置个人资料
function profile_setAction()
{/*{{{*/
    global $uid;
    if ($uid==0) {throw new Exception('请先登录');}
    $data = array (
        'gender' => gwadmin_validate::getNCParameter('gender','gender','integer'),
        'mobile' => gwadmin_validate::getNCParameter('mobile','mobile','string'),
    );  
    return C::t('common_member_profile')->update($uid,$data);
}/*}}}*/

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
