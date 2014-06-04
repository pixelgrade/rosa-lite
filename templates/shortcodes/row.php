<?php
$output = '';
$output .= '<div class="pixcode  pixcode--grid  grid  ';
if($thick_gutter) $output .= 'thick-gutter  ';
$output .= $class . '">' . PHP_EOL;
$output .= $this->get_clean_content( $content ) . PHP_EOL;
$output .= '</div>' . PHP_EOL;
echo $output;