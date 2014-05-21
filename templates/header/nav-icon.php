<?php 
// 1 => Icon
// 2 => Icon + Text
// 3 => Text
$nav_trigger = wpgrade::option('nav_trigger_style');

// 1 => Three Lines (default)
// 2 => Plus
// 3 => Dots + Lines
$nav_trigger_icon = wpgrade::option('nav_trigger_icon');

function navContent($option, $icon){
	switch ($option) {
		default: // 1
			echo navContentIcon($icon);
			break;

		case '2':
			echo navContentText($option);
			echo navContentIcon($icon);
			break;

		case '3':
			echo navContentText($option);
			break;
	}
}

function navContentIcon($option) {
	switch ($option) {
		default:
			return '<span class="nav-icon icon--lines"></span>';
			break;

		case '2':
			return '<span class="nav-icon icon--plus"></span>';
			break;

		case '3':
			return '<span class="nav-icon icon--dots"></span>';
			break;
	} 
}

function navContentText($option) {
	return '<span class="nav-text'.(($option != 3) ? ' push-half--right ' : '').'">'.wpgrade::option( 'nav_trigger_text', __('Menu', wpgrade::textdomain()) ).'</span>';
}
?>

<div class="site-navigation__trigger js-nav-trigger">
	<?php  navContent($nav_trigger,$nav_trigger_icon); ?>
</div>
