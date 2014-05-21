<?php

	/**
	 * Remove the first gallery shortcode from the content
	 */
	function wpgrade_callback_gallery_slideshow_filter($content) {
		$gallery_ids = array();
		$gallery_ids = get_post_meta(wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix().'main_gallery', true);

		if (get_post_format() == 'gallery' && empty($gallery_ids)) {
			// search for the first gallery shortcode
			$gallery_matches = null;
			preg_match("!\[gallery.+?\]!", $content, $gallery_matches);

			if ( ! empty($gallery_matches)) {
				$content = str_replace($gallery_matches[0], "", $content);
			}
		}

		return $content;
	}
