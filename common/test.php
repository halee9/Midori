<?php 

//echo dirname(__FILE__).DIRECTORY_SEPARATOR.'firebasePHP'.DIRECTORY_SEPARATOR.'firebaseLib.php';

include "http://teriyakionlne.com/common/phpclass/firebaseLib.php";
//include 'http://teriyakionlne.com/common/firebasePHP/firebaseLib.php';

//require_once dirname(__FILE__).DIRECTORY_SEPARATOR.'firebasePHP'.DIRECTORY_SEPARATOR.'firebaseLib.php';

echo "second";

const DEFAULT_URL = 'https://halee.firebaseio.com/';
const DEFAULT_TOKEN = 'JMhEG8CGeGKh1VWB731evuteverSQwkJQCRGwQOe';
const DEFAULT_TODO_PATH = '/sample/todo';

echo DEFAULT_URL;

$firebase = new Firebase(DEFAULT_URL, DEFAULT_TOKEN);

echo "Third";

$todoMilk = array(
	'name' => 'Pick the milk',
	'priority' => 1
);

$res = $firebase->set(DEFAULT_TODO_PATH, $todoMilk);



echo $res;

?>