<?php
$output = '';
$ratio = '';
switch ($size) {
    case 1:
        $ratio = 'one-twelfth';
        break;
    case 2:
        $ratio = 'two-twelfths';
        break;
    case 3:
        $ratio = 'three-twelfths';
        break;
    case 4:
        $ratio = 'four-twelfths';
        break;
    case 5:
        $ratio = 'five-twelfths';
        break;
    case 6:
        $ratio = 'six-twelfths';
        break;
    case 7:
        $ratio = 'seven-twelfths';
        break;
    case 8:
        $ratio = 'eight-twelfths';
        break;
    case 9:
        $ratio = 'nine-twelfths';
        break;
    case 10:
        $ratio = 'ten-twelfths';
        break;
    case 11:
        $ratio = 'eleven-twelfths';
        break;
    case 12:
        $ratio = 'one-whole';
        break;
}
$output .= '<div class="grid__item  '.$ratio. ' palm-one-whole ' .$class.'">'.PHP_EOL;
$output .= $this->get_clean_content( $content ).PHP_EOL;
$output .= '</div>'.PHP_EOL;
echo $output;