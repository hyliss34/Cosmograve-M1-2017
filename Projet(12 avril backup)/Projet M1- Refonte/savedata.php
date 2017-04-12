<?php
$f = fopen('d.txt', 'r+'); //Ouvre le fichier en lecture/ecriture (sans reset)
$a=fread($f,1);
$a = (int)$a; // transforme le string en int
$a = $a +1; // rajoute 1
$a = (string)$a; // retransforme en string
fclose($f); // referme 

$f = fopen('d.txt','w+'); //reouvre en lecture/ecriture avec reset
fwrite($f,$a); // ecrit
fclose($f); // referme
?>