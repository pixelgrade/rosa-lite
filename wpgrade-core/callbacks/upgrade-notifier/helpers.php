<?php

/**
 * @return boolean
 */
function wpgrade_update_notifier_check_if_new_version() {
	// get the latest remote XML file on our server
	$xml = wpgrade_update_notifier_latest_theme_version( wpgrade::update_notifier_cacheinterval() );

	if ( version_compare( $xml->latest, wpgrade::themeversion() ) == 1 ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Get the remote XML file contents and return its data (Version
 * and Changelog). Uses the cached version if available and inside the time
 * interval defined
 */
function wpgrade_update_notifier_latest_theme_version( $interval ) {
	$notifier_file_url           = wpgrade::updade_notifier_xml();
	$db_cache_field              = 'notifier-cache-' . wpgrade::shortname();
	$db_cache_field_last_updated = 'notifier-cache-last-updated-' . wpgrade::shortname();
	$last                        = get_option( $db_cache_field_last_updated );
	$now                         = time();

	// check the cache
	if ( ! $last || ( ( $now - $last ) > $interval ) ) {
		// cache doesn't exist, or is old, so refresh it

		$res   = wp_remote_get( $notifier_file_url );
		$cache = wp_remote_retrieve_body( $res );

		if ( $cache ) {
			// we got good results
			update_option( $db_cache_field, $cache );
			update_option( $db_cache_field_last_updated, time() );
		}

		// read from the cache file
		$notifier_data = get_option( $db_cache_field );
	} else {
		// cache file is fresh enough, so read from it
		$notifier_data = get_option( $db_cache_field );
	}


	// Let's see if the $xml data was returned as we expected it to.
	// If it didn't, use the default 1.0 as the latest version so that we don't have problems when the remote server hosting the XML file is down

	if ( strpos( (string) $notifier_data, '<notifier>' ) === false ) {
		$notifier_data = '<?xml version="1.0" encoding="UTF-8"?><notifier><latest>1.0</latest><changelog></changelog></notifier>';
	}

	// Load the remote XML data into a variable and return it
	$xml = simplexml_load_string( $notifier_data );

	return $xml;
}
