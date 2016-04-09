
<?php



require_once 'lib/firebasePHP/firebaseLib.php';

const DEFAULT_URL = 'https://halee.firebaseio.com/';
const DEFAULT_TOKEN = 'JMhEG8CGeGKh1VWB731evuteverSQwkJQCRGwQOe';
const DEFAULT_TODO_PATH = '/sample/todo';

$firebase = new Firebase(DEFAULT_URL, DEFAULT_TOKEN);

//echo $firebase;

$todoMilk = array(
	'name' => 'Pick the milk',
	'priority' => 1
);

$res = $firebase->set(DEFAULT_TODO_PATH, $todoMilk);



echo $res;

?>
