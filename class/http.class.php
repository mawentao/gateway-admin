<?php
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}
/**
 * HTTP通信
 **/
class gwadmin_http
{
	/**
     * GET 请求
     * @param string $url
	 * @param string $params
     */
    public static function get($url, $params)
	{/*{{{*/
        $oCurl = curl_init();
        $url = self::joinParams($url, $params);
//        echo $url,"\n";
		if(stripos($url,"https://")!==FALSE){
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
        }
        curl_setopt($oCurl, CURLOPT_URL, $url);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($oCurl, CURLOPT_VERBOSE, 1);
        curl_setopt($oCurl, CURLOPT_HEADER, false);
        curl_setopt($oCurl, CURLINFO_HEADER_OUT, false);
        $logstr = "HTTP-GET\turl:".$url;
        $sContent = self::execCURL($oCurl,$logstr);
        return $sContent;
    }/*}}}*/

	/**
     * POST 请求
     * @param string $url
     * @param string $params
     * @return string content
     */
    public static function post($url, $params, $fileField='')
	{/*{{{*/
        $oCurl = curl_init();
        if(stripos($url,"https://")!==FALSE){
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
        }
        curl_setopt($oCurl, CURLOPT_SAFE_UPLOAD, false);
/*
        if ($fileField!='' && isset($params[$fileField])) {
            if(PHP_VERSION_ID >= 50500 && class_exists('\CURLFile')){
                $is_curlFile = true;
            } else {
                $is_curlFile = false;
                if (defined('CURLOPT_SAFE_UPLOAD')) {
                    curl_setopt($oCurl, CURLOPT_SAFE_UPLOAD, false);
                }
            }
            if ($is_curlFile) {
                $file = $$params[$fileField];
                $params[$fileField] = new \CURLFile(realpath($val["tmp_name"]),$val["type"],$val["name"]);
                                foreach ($data as $key => $val) {
                    if(isset($val["tmp_name"])){
                        $data[$key] = new \CURLFile(realpath($val["tmp_name"]),$val["type"],$val["name"]);
                    }else if(substr($val, 0, 1) == '@'){
                        $data[$key] = new \CURLFile(realpath(substr($val,1)));
                    }
                }
            }
        }
*/
        curl_setopt($oCurl, CURLOPT_URL, $url);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($oCurl, CURLOPT_POST, true);
        curl_setopt($oCurl, CURLOPT_POSTFIELDS, $params);
        curl_setopt($oCurl, CURLOPT_VERBOSE, 1);
        curl_setopt($oCurl, CURLOPT_HEADER, false);
        curl_setopt($oCurl, CURLINFO_HEADER_OUT, false);
        curl_setopt($oCurl, CURLOPT_TIMEOUT, 100);

        $logstr = "HTTP-POST\turl:".$url."||req:".json_encode($params);
        $sContent = self::execCURL($oCurl,$logstr);
        curl_close($oCurl);
        return $sContent;
    }/*}}}*/

	/**
     * 执行CURL请求，并封装返回对象
     */
    private static function execCURL($ch,$logstr)
	{/*{{{*/
        $response = curl_exec($ch);
        $logstr.="||res:".$response;
        gwadmin_env::getlog()->trace($logstr);
        if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == '200') {
            return json_decode($response, true);
        }
        return null;
    }/*}}}*/
   
	private static function joinParams($path, $params)
    {/*{{{*/
        $url = $path;
        /////////////////////////////////////////////////
        if (stripos($path,"https://")!==FALSE || stripos($path,"http://")!==FALSE) {
            $url = $path;
        }
        /////////////////////////////////////////////////
        if (count($params) > 0)
        {
            $url = $url . "?";
            foreach ($params as $key => $value)
            {
                $url = $url . $key . "=" . $value . "&";
            }
            $length = count($url);
            if ($url[$length - 1] == '&')
            {
                $url = substr($url, 0, $length - 1);
            }
        }
        return $url;
    }/*}}}*/

}

?>
