<?php

	/**
	 * Invoked by wpgrade_callback_themesetup
	 *
	 * The function is executed on the_content
	 *
	 * @param string content
	 * @return string
	 */
	function wpgrade_callback_cleanup_the_content($content) {
		// remove the <p>s around imgs (http://css-tricks.com/snippets/wordpress/remove-paragraph-tags-from-around-images/)
	   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
	}