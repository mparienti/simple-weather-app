<?php

function getJson($url, $to_array = false, $ttl = null) {
    global $pool;
    $sha = sha1($url);
    $item = $pool->getItem($sha);
    if (!$item->isHit()) {
        $data = file_get_contents( $url );
        $value = json_decode( $data, $to_array );
        $item->set($value)
            ->expiresAfter(null);
        $pool->save($item);
    }
    return $item->get();
}

