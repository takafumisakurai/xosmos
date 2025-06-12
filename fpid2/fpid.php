<?php
#
    function guidv4($data)
    {
        $data = $data ?? random_bytes(16);
 
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
 
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
# サイト上でFPIDが発行されていない場合に、新たに生成する部分
    if(!isset($_COOKIE['s_fpid'])) { // Cookie名は「s_fpid」としている
        $cookie_name = 's_fpid';
        $cookie_value = guidv4(openssl_random_pseudo_bytes(16));
        $arr_cookie_options = array (
        'expires' => time() + 60*60*24*30*13,
        'path' => '/',
        'domain' => 'takafumisakurai.github.io', // ここは各ウェブサイトのドメインに変更する
        'secure' => false, // https通信のみCookieを送信する場合は「True」にしておく
        'httponly' => true,
        'samesite' => 'lax'
        );
        setcookie($cookie_name, $cookie_value, $arr_cookie_options);
        $_COOKIE[$cookie_name] = $cookie_value;
    }
# FPIDが既に発行されている場合は、有効期限を延長するのみ
    else {
        $cookie_value = $_COOKIE['s_fpid'];
        $arr_cookie_options = array (
        'expires' => time() + 60*60*24*30*13,
        'path' => '/',
        'domain' => 'takafumisakurai.github.io',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'lax'
        );
        setcookie($cookie_name, $cookie_value, $arr_cookie_options);
    }
 
?>
