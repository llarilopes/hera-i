<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Rota para receber contato do frontend
$router->post('/contact', 'ContactController@store');

// Rotas para FAQ
$router->get('/faq/questions', 'FaqController@getQuestions');
$router->post('/faq/vote', 'FaqController@registerVote');
$router->post('/faq/click', 'FaqController@registerClick');

// Rotas para visitas
$router->post('/visits/start', 'VisitController@registerStart');
$router->post('/visits/end', 'VisitController@registerEnd');
