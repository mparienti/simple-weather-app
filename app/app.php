<?php

use Symfony\Component\HttpFoundation\Request;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use Cache\Adapter\Filesystem\FilesystemCachePool;
use Cmfcmf\OpenWeatherMap;


require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/utils.php';
require_once __DIR__.'/config.php';

$app = new Silex\Application();

$filesystemAdapter = new Local(__DIR__.'/../cache/pool/');
$filesystem        = new Filesystem($filesystemAdapter);

$pool = new FilesystemCachePool($filesystem);

$app->register(new Silex\Provider\TwigServiceProvider(),
               array(
                   'twig.path' => __DIR__.'/../views',
               )
);

$app->get('/autocomplete', function (Request $request) use ($app) {

    try {
        $baseUrl = 'http://nominatim.openstreetmap.org/search?';
        $term = $request->query->get('term');
        $json = getJson($u="{$baseUrl}q={$term}&format=json");
        $response = [];

        if (is_array($json)) {
            foreach ($json as $geoname) {
                if (!isset ($geoname->lon) || !isset($geoname->lat)) {
                    continue;
                }
                $response[] = array('id' => $geoname->lat . '|' . $geoname->lon,
                                    'label' => $geoname->display_name,

                );
            }
        }

        return $app->json($response);

    } catch (Exception $e) {
        return $app->json($e);// Should do better here
    }
});

$app->get('/', function (Request $request) use ($app) {
    try {
        if ($request->query->get('place-id')=='') {
            return $app['twig']->render('weather.twig', []);
        }
        $place = explode( '|', $request->query->get('place-id'));
        $lat = $place[0];
        $lon = $place[1];

        $owm = new OpenWeatherMap(OPENWEATHER_API_KEY);

        $forecast = $owm->getWeatherForecast(['lat' => $lat, 'lon' => $lon], 'metric', '', '', 5);
        $current = $owm->getWeather(['lat' => $lat, 'lon' => $lon], 'metric', '', '', 5);

        return $app['twig']->render('weather.twig', ['forecasts' => $forecast,
                                                     'current' => $current,
        ]);

    } catch (Exception $e) {
        return $app['twig']->render('error.twig', ['error' => $e]);
    }
});

return $app;