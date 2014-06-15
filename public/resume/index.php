<?php
$iPod = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
$iPhone = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$iPad = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
if($iPod || $iPhone || $iPad){
	header("Location: resume.pdf");
	die();
} else {
  include "index.html";
}
?>
