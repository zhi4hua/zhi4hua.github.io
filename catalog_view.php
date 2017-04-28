<?php
    ob_start();

	$dir = "./";
	$file = scandir($dir);
	print_r($file);
    echo nl2br("\n");
    foreach ($file as $key => $value) {
        echo $key.'-'.$value.nl2br("\t");
    }

    $form = ob_get_clean();
    // $form = ob_get_contents();
    // ob_end_clean();

    // $GLOBALS['TEMPLATE']['content'] = = $form;
    require_once './template-page.php';
?>
