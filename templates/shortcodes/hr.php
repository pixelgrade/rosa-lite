<?php 
    
    // get needed classes
    $classes = 'pixcode  pixcode--separator  separator';
    $classes.= !empty($style) ? ' separator--'.$style : '';
	$classes.= !empty($color) ? ' separator_color--'.$color : '';
//	$classes.= !empty($align) ? ' align-'.$align : '';
    // create class attribute
    $classes =  'class="'.trim($classes).'"' ;

echo '<hr '.$classes.'/>';