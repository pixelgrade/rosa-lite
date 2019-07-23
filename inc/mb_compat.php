<?php
/**
 * Multibyte String Functions Pseudo-Replacements
 * This is in case the mb PHP extension is not present although it should be
 */

if ( ! function_exists( 'mb_internal_encoding' ) ) {
	function mb_internal_encoding( $enc = '' ) {
		return true;
	}
}

if ( ! function_exists( 'mb_regex_encoding' ) ) {
	function mb_regex_encoding( $enc = '' ) {
		return true;
	}
}

if ( ! function_exists( 'mb_strlen' ) ) {
	function mb_strlen( $text, $encode = 'UTF-8' ) {
		if ( $encode == 'UTF-8' ) {
			return preg_match_all( '%(?:
					  [\x09\x0A\x0D\x20-\x7E]           # ASCII
					| [\xC2-\xDF][\x80-\xBF]            # non-overlong 2-byte
					|  \xE0[\xA0-\xBF][\x80-\xBF]       # excluding overlongs
					| [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2} # straight 3-byte
					|  \xED[\x80-\x9F][\x80-\xBF]       # excluding surrogates
					|  \xF0[\x90-\xBF][\x80-\xBF]{2}    # planes 1-3
					| [\xF1-\xF3][\x80-\xBF]{3}         # planes 4-15
					|  \xF4[\x80-\x8F][\x80-\xBF]{2}    # plane 16
					)%xs', $text, $out );
		} else {
			return strlen( $text );
		}
	}
}

if ( ! function_exists( 'mb_substr' ) ) {
	function mb_substr( $string, $offset, $length = 0, $encoding = '' ) {
		$arr   = preg_split( "//u", $string );
		$slice = array_slice( $arr, $offset + 1, $length );

		return implode( "", $slice );
	}
}

if ( ! function_exists( 'mb_strrpos' ) ) {
	/**
	 * Fallback implementation of mb_strrpos, hardcoded to UTF-8.
	 *
	 * @param $haystack String
	 * @param $needle   String
	 * @param $offset   String: optional start position
	 * @param $encoding String: optional encoding; ignored
	 *
	 * @return int
	 */
	function mb_strrpos( $haystack, $needle, $offset = 0, $encoding = 'UTF-8' ) {
		$needle = preg_quote( $needle, '/' );

		$ar = array();
		preg_match_all( '/' . $needle . '/u', $haystack, $ar, PREG_OFFSET_CAPTURE, $offset );

		if ( isset( $ar[0] ) && count( $ar[0] ) > 0 && isset( $ar[0][ count( $ar[0] ) - 1 ][1] ) ) {
			return $ar[0][ count( $ar[0] ) - 1 ][1];
		} else {
			return false;
		}
	}
}
