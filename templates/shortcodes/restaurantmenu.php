<?php
/**
 * This is a PixCodes template that overwrites the one in the plugin.
 *
 * The plugin is responsible for putting all the needed variables in the scope of this file.
 *
 * @link https://wordpress.org/plugins/pixcodes/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

//initialize things
$output = '';

if ( ! defined( 'SECTION_MARKER' ) ) {
	define( 'SECTION_MARKER', '#' );
}

if ( ! defined( 'TITLE_MARKER' ) ) {
	define( 'TITLE_MARKER', '##' );
}

if ( ! defined( 'DESCRIPTION_MARKER' ) ) {
	define( 'DESCRIPTION_MARKER', '**' );
}

if ( ! defined( 'PRICE_MARKER' ) ) {
	define( 'PRICE_MARKER', '==' );
}


/* Lets get to parsing the hell out of the received content so we can have something to eat */

// Fist make sure no loose ends or beginnings
// Clean Slate operation under way
$restaurant_menu = trim( $this->get_clean_content( $content ) );

// Some special styles
$restaurant_menu_style_class = '';
if ( isset( $type ) && ! empty( $type ) ) {
	$restaurant_menu_style_class = 'menu-list__' . $type;
}

// Remove <p> - we just need the </p>s to split by
$restaurant_menu = str_replace( "<p>", "", $restaurant_menu );

/**
 * now split it by paragraphs - this is for us the empty line
 * WordPress's autop adds paragraphs only when encountering empty lines
 * and since we treat empty lines like a show stopper - new product
 * this is good enough for us - no need to un-autop and split by new line chars
 */
$lines = preg_split( '#(<\/p>|<br \/>|<br\/>|<br>)#', $restaurant_menu );
// Remove any empty array elements - empty strings
$lines = array_filter( $lines, 'strlen' );

// Open the wrapper and let the show begin
$output .= '<div class="menu-list ' . esc_attr( $restaurant_menu_style_class ) . '">' . "\n";

// Remember if we have outputted the open tag
$opened_list                    = false;
$opened_product                 = false;
$opened_product_highlight       = false;
$opened_product_highlight_title = '';
$opened_description             = false;
$number_of_descriptions         = 0;

// First lets clean the lines of empty characters
foreach ( $lines as $key => $line ) {
	$lines[ $key ] = trim( $line );
}

// Now go through each line and give it the appropriate markup
foreach ( $lines as $key => $line ) {
	/*
	 * Now for the real hard work
	 * Go through each line and see its beginning to know how to treat it
	 * The ----- is a special case as it has nothing else
	 */
	if ( $line == '---' || $line == '----' || $line == '-----' ) {
		$output .= '<hr class="separator"/>' . "\n";

		continue;
	}

	/*
	 * Now to test for the front markers - from complex to simple
	 */

	// Product Title
	if ( 0 === strpos( $line, TITLE_MARKER ) ) {
		// Since we have found a product we need to make sure that the product list is started
		if ( false === $opened_list ) {
			$output      .= '<ul class="menu-list__items">' . "\n";
			$opened_list = true;
		}

		//close any previously opened products
		if ( true === $opened_product ) {
			//if there was a highlight title we need to close the wrapper
			if ( true === $opened_product_highlight ) {
				$output .= '</div>' . "\n";

				//empty it so everybody knows we no longer have a highlight
				$opened_product_highlight = false;
			}

			$output .= '</li>' . "\n";

			// Tell the world that we have exited the product
			$opened_product = false;
		}

		// We have a new product so we better open a new wrapper
		$output         .= '<li class="menu-list__item">' . "\n";
		$opened_product = true;

		// Now lets check if we have a highlight
		if ( $opened_product_highlight_title !== '' ) {
			$output .= '<div class="menu-list__item-highlight-wrapper">' . "\n";
			$output .= '<span class="menu-list__item-highlight-title">' . $opened_product_highlight_title . '</span>' . "\n";

			$opened_product_highlight       = true;
			$opened_product_highlight_title = ''; // since we outputted it make it empty
		}

		// We need to do some look-ahead to see if we have a product with subproducts - multiple description-price groups
		$number_of_descriptions = 0;
		$number_of_prices       = 0;
		$idx                    = $key + 1;
		while ( $idx < count( $lines ) && 0 !== strpos( $lines[ $idx ], TITLE_MARKER ) && 0 !== strpos( $lines[ $idx ], SECTION_MARKER ) ) {
			if ( 0 === strpos( $lines[ $idx ], DESCRIPTION_MARKER ) ) {
				$number_of_descriptions ++;
			}

			if ( 0 === strpos( $lines[ $idx ], PRICE_MARKER ) ) {
				$number_of_prices ++;
			}

			$idx ++;
		}

		$output .= '<h4 class="menu-list__item-title">';

		// Now output the title without the first 2 characters

		// Check if there is a description at most and at least a price => show the dots
		if ( $number_of_descriptions < 2 && $number_of_prices > 0 && isset( $type ) && $type == 'dotted' ) {
			$output .= '<span class="item_title">' . substr( $line, 2 ) . '</span><span class="dots"></span>';
		} else {
			$output .= substr( $line, 2 );
		}

		$output .= '</h4>' . "\n";

		continue;
	}

	// Product description
	if ( 0 === strpos( $line, DESCRIPTION_MARKER ) ) {
		// First close any opened description
		if ( true === $opened_description ) {
			$output             .= '</p>' . "\n";
			$opened_description = false;
		}
		// Output the description without the first 2 characters
		$output             .= '<p class="menu-list__item-desc"><span class="desc__content">' . substr( $line, 2 ) . '</span>';
		$opened_description = true;

		if ( $number_of_descriptions < 2 ) {
			// We can safely close the description paragraph as the price will align with the product title not the description
			$output             .= '</p>' . "\n";
			$opened_description = false;
		}

		continue;
	}

	// Product price
	if ( 0 === strpos( $line, PRICE_MARKER ) ) {
		// Output the price without the first 2 characters
		if ( isset( $type ) && $type == 'dotted' ) {
			$output .= '<span class="dots"></span>';
		}
		$output .= '<span class="menu-list__item-price">' . substr( $line, 2 ) . '</span>';
		// Close any opened description
		if ( true === $opened_description ) {
			$output             .= '</p>' . "\n";
			$opened_description = false;
		}

		continue;
	}

	// Section Title
	if ( 0 === strpos( $line, SECTION_MARKER ) ) {
		// First we need to know if there are any lists, products or descriptions opened and close them
		if ( true === $opened_description ) {
			$output             .= '</p>' . "\n";
			$opened_description = false;
		}

		// Close any previously opened products
		if ( true === $opened_product ) {
			// If there was a highlight title we need to close the wrapper
			if ( true === $opened_product_highlight ) {
				$output .= '</div>' . "\n";

				// Empty it so everybody knows we no longer have a highlight
				$opened_product_highlight_title = '';
				$opened_product_highlight       = false;
			}

			$output         .= '</li>' . "\n";
			$opened_product = false;
		}

		if ( true === $opened_list ) {
			$output      .= '</ul>' . "\n";
			$opened_list = false;
		}

		// Now output the section title without the first character
		$output .= '<h2 class="menu-list__title">' . substr( $line, 1 ) . '</h2>' . "\n";

		continue;
	}
}

// Some last sanity check - no loose ends
// Close any previously opened descriptions
if ( true === $opened_description ) {
	$output             .= '</p>' . "\n";
	$opened_description = false;
}

// Close any previously opened products
if ( true === $opened_product ) {
	// If there was a highlight title we need to close the wrapper
	if ( true === $opened_product_highlight ) {
		$output .= '</div>' . "\n";

		// Empty it so everybody knows we no longer have a highlight
		$opened_product_highlight_title = '';
		$opened_product_highlight       = false;
	}

	$output         .= '</li>' . "\n";
	$opened_product = false;
}

if ( true === $opened_list ) {
	$output      .= '</ul>' . "\n";
	$opened_list = false;
}

// All done - close the wrapper
$output .= '</div>' . "\n";

echo $output; // phpcs:ignore
