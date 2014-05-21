<?php

	/**
	 * Make sure wordpress allows our mime types.
	 *
	 * @return array
	 */
	function wpgrade_callback_custom_upload_mimes($existing_mimes = null) {
		if ($existing_mimes === null) {
			$existing_mimes = array();
		}

		$existing_mimes['mp3'] = 'audio/mpeg3';
		$existing_mimes['oga'] = 'audio/ogg';
		$existing_mimes['ogv'] = 'video/ogg';
		$existing_mimes['mp4a'] = 'audio/mp4';
		$existing_mimes['mp4'] = 'video/mp4';
		$existing_mimes['weba'] = 'audio/webm';
		$existing_mimes['webm'] = 'video/webm';
		
		//and some more
		$existing_mimes['svg'] = 'image/svg+xml';

		return $existing_mimes;
	}
