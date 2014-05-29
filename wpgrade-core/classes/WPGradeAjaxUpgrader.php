<?php defined( 'ABSPATH' ) or die;

/* This file is property of Pixel Grade Media. You may NOT copy, or redistribute
 * it. Please see the license that came with your copy for more information.
 */

include_once wpgrade::corepath() . 'vendor/envato-wtl/class-envato-protected-api' . EXT;
include_once wpgrade::corepath() . 'vendor/envato-wtl/class-envato-backup' . EXT;

/**
 * @package        wpgrade
 * @category       core
 * @author         Pixel Grade Team
 * @copyright  (c) 2013, Pixel Grade Media
 */
class WPGradeAjaxUpgrader {

	/**
	 * @var Envato_Protected_API
	 */
	protected $api = null;

	/**
	 * @var array
	 */
	protected $errors = null;

	/**
	 * ...
	 */
	function __construct( $username = null, $api_key = null ) {
		if ( $username !== null ) {
			$this->api = new Envato_Protected_API( $username, $api_key );
		}
	}

	/**
	 * @return array
	 */
	function errors() {
		return $this->errors;
	}

	/**
	 * @return boolean
	 */
	function valid_marketplace_data( $allow_cache = false ) {

		# we place a request in an attempt to check for errors
		# if the request succeeds then the credentials are valid

		ob_start();
		$themes          = $this->api->wp_list_themes( $allow_cache );
		$errors          = $this->api->api_errors();
		$internal_errors = ob_get_clean();

		if ( ! empty( $internal_errors ) || $themes === false ) {
			throw new Exception( 'TeamForest/Envato API error.' );
		}

		if ( $errors !== null ) {
			return false;
		} else { // no errors
			return true;
		}
	}

	/**
	 * @return boolean
	 */
	function is_update_available( $theme_name, $allow_cache = false ) {
		if ( empty( $theme_name ) ) {
			$theme_temp = wp_get_theme();
			$theme_name = $theme_temp->Name;
		}

		$installed_theme = $this->retrieve_installed_theme( $theme_name );

		if ( $installed_theme == null ) {
			$transalated_message = __( 'The theme <b>:theme_name</b> is not installed.<br><i>If you are certain the theme it is installed, please contact support.</i>', wpgrade::textdomain() );
			$this->errors        = array( strtr( $transalated_message, array( ':theme_name' => $theme_name ) ) );

			return false;
		}

		ob_start();
		$purchased_themes = $this->api->wp_list_themes( $allow_cache );
		$errors           = $this->api->api_errors();
		$internal_errors  = ob_get_clean();

		if ( ! empty( $internal_errors ) || $purchased_themes === false ) {
			throw new Exception( 'TeamForest/Envato API error.' );
		}

		if ( $errors !== null ) {
			$this->errors = array( __( 'Failed to retrieve theme list via Envato API.', wpgrade::textdomain() ) );

			return false;
		}

		foreach ( $purchased_themes as $purchased ) {
			if ( $this->is_matching_themes( $installed_theme, $purchased ) ) {
				if ( $this->is_newer_version_available( $installed_theme['Version'], $purchased->version ) ) {
					return true;
				} else { // no new version available
					$transalated_message = __( 'There is no update available for the theme <b>:theme_name</b>', wpgrade::textdomain() );
					$this->errors        = array( strtr( $transalated_message, array( ':theme_name' => $theme_name ) ) );

					return false;
				}
			}
		}

		$transalated_message = __( 'Failed to find the theme <b>:theme_name</b>', wpgrade::textdomain() );
		$this->errors        = array( strtr( $transalated_message, array( ':theme_name' => $theme_name ) ) );

		return false;
	}

	/**
	 * @return WP_Theme|null
	 */
	protected function retrieve_installed_theme( $theme_name ) {
		$installed_theme = wp_get_theme();

		if ( is_child_theme() ) {
			$installed_theme = wp_get_theme( $installed_theme->template );
		}

		// our modification - get only the active theme
		if ( strcmp( $installed_theme['Name'], $theme_name ) == 0 ) {
			return $installed_theme;
		}

		return null;
	}

	/**
	 * @return boolean
	 */
	protected function is_matching_themes( $installed_theme, $purchased_theme ) {
		return $installed_theme['Title'] == $purchased_theme->theme_name && $installed_theme['Author Name'] == $purchased_theme->author_name;
	}

	/**
	 * @return boolean
	 */
	protected function is_newer_version_available( $installed_vesion, $latest_version ) {
		return version_compare( $installed_vesion, $latest_version, '<' );
	}


	//// Downloader ////////////////////////////////////////////////////////////////

	/**
	 * @return string url
	 */
	function download_url( $theme_name, $allow_cache = true ) {
		if ( empty( $theme_name ) ) {
			$theme_temp = wp_get_theme();
			$theme_name = $theme_temp->Name;
		}

		$installed_theme = $this->retrieve_installed_theme( $theme_name );

		if ( $installed_theme == null ) {
			$transalated_message = __( 'The theme <b>:theme_name</b> is not installed.<br><i>If you are certain the theme it is installed, please contact support.</i>', wpgrade::textdomain() );
			$this->errors        = array( strtr( $transalated_message, array( ':theme_name' => $theme_name ) ) );

			return null;
		}

		ob_start();
		$purchased_themes = $this->api->wp_list_themes( $allow_cache );
		$errors           = $this->api->api_errors();
		$internal_errors  = ob_get_clean();

		if ( ! empty( $internal_errors ) || $purchased_themes === false ) {
			$transalated_message = __( 'TeamForest/Envato API error.', wpgrade::textdomain() );
			$this->errors        = array( $transalated_message );

			return null;
		}

		if ( $errors !== null ) {
			$this->errors = array( __( 'Failed to retrieve theme list via Envato API.', wpgrade::textdomain() ) );

			return null;
		}

		$marketplace_theme_data = null;
		foreach ( $purchased_themes as $purchased ) {
			if ( $this->is_matching_themes( $installed_theme, $purchased ) ) {
				if ( $this->is_newer_version_available( $installed_theme['Version'], $purchased->version ) ) {
					$marketplace_theme_data = $purchased;
					break;
				} else { // no new version available
					$transalated_message = __( 'There is no update available for the theme <b>:theme_name</b>', wpgrade::textdomain() );
					$this->errors        = array( strtr( $transalated_message, array( ':theme_name' => $theme_name ) ) );

					return null;
				}
			}
		}

		if ( $marketplace_theme_data == null ) {
			$transalated_message = __( 'Failed to find <b>:theme_name</b> in your list of purchased themes. (please contact support)', wpgrade::textdomain() );
			$this->errors        = array( strtr( $transalated_message, array( ':theme_name' => $theme_name ) ) );

			return null;
		}

		$result = $this->api->wp_download( $marketplace_theme_data->item_id );

		if ( is_array( $result ) ) {
			$this->errors = $result;

			return null;
		}

		return $result;
	}

	/**
	 * @return array content-length and accept-ranges information
	 */
	function download_info( $theme_name, $allow_cache = true ) {

		$download_info = array(
			'accept-ranges'  => 'none',
			'content-length' => - 1,
		);

		$download_url = $this->download_url( $theme_name );

		// got valid url?
		if ( $download_url === null ) {
			return null;
		}

		// Retrieve Info
		// -------------

		$errcode = null;
		$errstr  = null;

		$parts = parse_url( $download_url );
		$in    = fsockopen( $parts['host'], 80, $errcode, $errstr, 5 );

		if ( $in == false ) {
			array_push( $this->errors, 'Failed to open socket to download url (error ' . $errcode . ': ' . $errstr . ').' );
			fclose( $in );

			return null;
		}

		// integrate query into path since we're going to write the headers
		// manually
		if ( ! empty( $parts['query'] ) ) {
			$parts['path'] .= '?' . $parts['query'];
		}

		// send request header
		$request = "GET {$parts['path']} HTTP/1.1\r\n";
		$request .= "Host: {$parts['host']}\r\n";
		$request .= "User-Agent: Mozilla/5.0\r\n";
		$request .= "Keep-Alive: 115\r\n";
		$request .= "Connection: keep-alive\r\n\r\n";
		fwrite( $in, $request );

		// read response header
		$headers = array();
		while ( ! feof( $in ) ) {
			$line = fgets( $in );
			if ( $line == "\r\n" ) {
				break;
			}
			$headers[] = $line;
		}

		// get info
		foreach ( $headers as $header ) {
			if ( stripos( strtolower( $header ), 'content-length:' ) === 0 ) {
				$download_info['content-length'] = (int) str_replace( 'content-length: ', '', strtolower( $header ) );
			} else if ( stripos( strtolower( $header ), 'accept-ranges:' ) === 0 ) {
				$download_info['accept-ranges'] = trim( str_replace( 'accept-ranges:', '', strtolower( $header ) ) );
			}
		}

		fclose( $in );

		return $download_info;
	}

	/**
	 * @return int bytes written
	 */
	function download( $download_info, $download_url, $localfile, $startbytes = 0, $endbytes = null, $chunksize = null ) {

		// Setup Defaults
		// --------------

		$default_download_info = array( 'accept-ranges' => 'none', 'content-length' => 0 );
		$download_info         = array_merge( $default_download_info, $download_info );
		$chunksize !== null or $chunksize = 8192;

		// we only support byte ranges or single request download
		if ( ! in_array( $download_info['accept-ranges'], array( 'none', 'bytes' ) ) ) {
			$download_info['accept-ranges'] = 'none';
		}

		// Sanity Checks
		// -------------

		if ( $download_info['accept-ranges'] == 'none' && ( $startbytes !== 0 || $endbytes !== null ) ) {
			array_push( $this->errors, 'Download server is not capable of fulfilling request parameters.' );

			return - 1;
		}

		// Calculate content range
		// -----------------------

		#
		# range bytes start at 0
		# eg. first 500 -> Range: bytes=0-499
		#

		if ( $endbytes === null ) {
			$endbytes = $download_info['content-length'] - 1;
		}

		$readin_length = $endbytes - $startbytes + 1;

		// Write Range
		// -----------

		$errcode = null;
		$errstr  = null;

		$parts = parse_url( $download_url );
		$in    = fsockopen( $parts['host'], 80, $errcode, $errstr, 5 );
		$out   = fopen( $localfile, 'ab' );

		if ( $in == false ) {
			array_push( $this->errors, 'Failed to open socket to download url (error ' . $errcode . ': ' . $errstr . ').' );

			return - 1;
		}

		// integrate query into path since we're going to write the
		// headers manually
		if ( ! empty( $parts['query'] ) ) {
			$parts['path'] .= '?' . $parts['query'];
		}

		// send request header
		$request = "GET {$parts['path']} HTTP/1.1\r\n";
		$request .= "Host: {$parts['host']}\r\n";
		$request .= "User-Agent: Mozilla/5.0\r\n";

		// does the download server accept ranges?
		if ( $download_info['accept-ranges'] !== 'none' ) {
			$request .= "Range: bytes=$startbytes-$endbytes\r\n";
		}

		$request .= "Keep-Alive: 115\r\n";
		$request .= "Connection: keep-alive\r\n\r\n";
		fwrite( $in, $request );

		// read response header (just so we get rid of it)
		$headers = array();
		while ( ! feof( $in ) ) {
			$line = fgets( $in );
			if ( $line == "\r\n" ) {
				break;
			}
			$headers[] = $line;
		}

		$cnt = 0;
		while ( ! feof( $in ) ) {
			$buf = '';

			if ( $cnt + $chunksize < $readin_length ) {
				$readin_chunksize = $chunksize;
			} else { // generate exact chunk size
				$readin_chunksize = $readin_length - $cnt;
			}

			$buf   = fread( $in, $readin_chunksize );
			$bytes = fwrite( $out, $buf );

			if ( $bytes == false ) {
				array_push( $this->errors, 'Failed to write bytes to local copy.' );

				return - 1;
			}

			$cnt += $bytes;
			if ( $cnt >= $readin_length ) {
				break;
			}
		}

		fclose( $in );
		fclose( $out );

		return $cnt;
	}


	//// Installer /////////////////////////////////////////////////////////////////

	/**
	 * @return boolean success?
	 */
	function install( $theme, $localfile ) {
		$this->errors = array();

		// Define Workspace
		// ----------------

		$current_theme = WP_CONTENT_DIR . '/themes/' . $theme;
		$older_theme   = $current_theme . '-oldercopy';
		$copy_theme    = $current_theme . '-workcopy';
		$theme_test1   = $current_theme . '-test1';
		$theme_test2   = $current_theme . '-test2';

		foreach ( array( $theme_test1, $theme_test2 ) as $file ) {
			if ( file_exists( $file ) ) {
				$this->rmdir( $file );
				if ( file_exists( $file ) ) {
					array_push( $this->errors, 'Failed to cleanup previous sanity checks.' );

					return false;
				}
			}
		}

		// Sanity Checks
		// -------------

		@mkdir( $theme_test1 );
		if ( ! file_exists( $theme_test1 ) ) {
			array_push( $this->errors, 'Failed pre-swap checks, test theme could not be created.' );

			return false;
		}

		file_put_contents( $theme_test1 . '/checkfile', 'This is a sanity check file. If you are seing it a upgrade has failed. Feel free to remove this file along with it\'s parent directory.' );

		// test rename
		rename( $theme_test1, $theme_test2 );

		if ( file_exists( $theme_test1 ) || ! file_exists( $theme_test2 ) || ! file_exists( "$theme_test2/checkfile" ) ) {
			array_push( $this->errors, 'PHP failed a directory rename test. (process aborded before theme loss)' );
			// atempt to cleanup
			$this->rmdir( $theme_test1 );
			$this->rmdir( $theme_test2 );

			return false;
		}

		// test removal
		$this->rmdir( $theme_test2 );

		if ( file_exists( $theme_test2 ) ) {
			array_push( $this->errors, 'PHP failed a directory deletion test in the theme install process. (process aborded before theme loss)' );

			return false;
		}

		// Unzip & remove temporary file
		// -----------------------------

		if ( ! $this->unzip( $localfile, $copy_theme ) ) {
			# error message already set by unzip_file
			@unlink( $localfile );

			return false;
		}

		if ( ! file_exists( $copy_theme ) ) {
			array_push( $this->errors, 'PHP failed to extract updated theme files. (process aborded before theme loss)' );
			@unlink( $localfile );

			return false;
		}

		if ( ! file_exists( "$copy_theme/style.css" ) ) {

			// may be inner arhive
			$inner_files = array_values( array_diff( scandir( $copy_theme ), array(
				'.',
				'..',
				'.DS_Store',
				'__MACOSX'
			) ) );

			if ( count( $inner_files ) == 1 && is_dir( "$copy_theme/$inner_files[0]" ) ) {
				rename( "$copy_theme/$inner_files[0]", $copy_theme . '-temp' );
				$this->rmdir( $copy_theme );
				rename( $copy_theme . '-temp', $copy_theme );
			}

			// re-test
			if ( ! file_exists( "$copy_theme/style.css" ) ) {
				array_push( $this->errors, 'PHP improperly extracted update files. (process aborded before theme loss)' );
				$this->rmdir( $copy_theme );
				@unlink( $localfile );

				return false;
			}
		}

		// unzip succesful
		// package file no longer needed
		@unlink( $localfile );

		// Theme Swap
		// ----------

		@rename( $current_theme, $older_theme );
		@rename( $copy_theme, $current_theme );
		$this->rmdir( $older_theme );

		if ( ! file_exists( $current_theme ) || ! file_exists( "$current_theme/style.css" ) ) {
			array_push( $this->errors, 'Critical error, theme swap failed. Theme lost. Please reinstall or use the backup create in the process, and contact support.' );

			return false;
		}

		if ( file_exists( $copy_theme ) || file_exists( $older_theme ) ) {
			array_push( $this->errors, 'Process succeeded, but failed to cleanup. (your theme should still have been updated; please inform support)' );

			return false;
		}

		return true;
	}

	/**
	 * @return boolean
	 */
	protected function unzip( $package, $working_dir ) {
		if ( class_exists( 'ZipArchive' ) ) {
			$zip = new ZipArchive();
			$res = $zip->open( $package );
			if ( $res === true ) {
				$zip->extractTo( $working_dir );
				$zip->close();
			} else { // failed to open zip
				array_push( $this->errors, 'Failed to extract update package.' );

				return false;
			}

			return true;
		} else { // no zip archive
			array_push( $this->errors, 'Missing ZipArhive class. Please check your PHP version. (process aborted before theme loss)' );

			return false;
		}
	}

	/**
	 * ...
	 */
	protected function copy( $src, $dst ) {
		if ( ! is_dir( $src ) ) {
			copy( $src, $dst );
		} else { // is_dir(src)
			$dir = opendir( $src );
			@mkdir( $dst );

			if ( ! file_exists( $dst ) ) {
				throw new Exception( 'Failed to create directory: ' . $dst );
			}

			while ( false !== ( $file = readdir( $dir ) ) ) {
				if ( ( $file != '.' ) && ( $file != '..' ) ) {
					$this->copy( $src . '/' . $file, $dst . '/' . $file );
				}
			}

			closedir( $dir );
		}
	}

	/**
	 * ...
	 */
	protected function rmdir( $dir ) {
		if ( ! file_exists( $dir ) ) {
			return;
		}

		$files = array_diff( scandir( $dir ), array( '.', '..' ) );
		foreach ( $files as $file ) {
			if ( is_dir( "$dir/$file" ) ) {
				$this->rmdir( "$dir/$file" );
			} else { // file
				@unlink( "$dir/$file" );
			}
		}

		// remove the directory now that it's empty
		@rmdir( $dir );
	}


	//// Backup Theme //////////////////////////////////////////////////////////////

	/**
	 * @todo refactor backup system so it is reversable
	 * @todo refactor out Envato_Backup
	 * @return boolean
	 */
	function backup_theme( $theme_dirname ) {
		// initialize errors
		$this->errors = array();

		// configure backup
		$theme_backup                   = Envato_Backup::get_instance();
		$theme_backup->path             = WP_CONTENT_DIR . '/envato-backups/';
		$theme_backup->root             = get_theme_root() . '/' . $theme_dirname . '/';
		$theme_backup->archive_filename = strtolower( sanitize_file_name( $theme_dirname . '.backup.' . date( 'Y-m-d-H-i-s', time() + ( current_time( 'timestamp' ) - time() ) ) . '.zip' ) );

		if ( ! $this->is_valid_dir_path( $theme_backup->path() ) ) {
			array_push( $this->errors, 'Invalid backup path: ' . $this->secure_display_path( $theme_backup->path() ) . ' (bad permissions or does not exist)' );

			return false;
		}

		if ( ! $this->is_valid_backup_root( $theme_backup->root() ) ) {
			array_push( $this->errors, 'Invalid backup root path: ' . $this->secure_display_path( $theme_backup->root() ) . ' (bad permissions or not a directory)' );

			return false;
		}

		// @todo clearer handling of errors from backup() method; currently black box
		$theme_backup->backup();

		if ( file_exists( $theme_backup->archive_filepath() ) ) {
			return true;
		} else { // failed to create backup
			array_push( $this->errors, 'Backup creation process succeeded but backup file can not be confirmed: ' . $this->secure_display_path( $theme_backup->archive_filepath() ) );

			return false;
		}
	}

	/**
	 * @return boolean
	 */
	protected function is_valid_dir_path( $path ) {
		return # path exists?
			( is_dir( $path ) || # creating path is possible?
			  ( is_writable( dirname( $path ) ) && mkdir( $path ) ) ) && # path is usable?
			is_writable( $path );
	}

	/**
	 * @return boolean
	 */
	protected function is_valid_backup_root( $path ) {
		return is_dir( $path ) && is_readable( $path );
	}

	/**
	 * @return string
	 */
	protected function secure_display_path( $path ) {
		$clean_abspath = str_replace( '\\', '/', ABSPATH );
		$clean_path    = str_replace( '\\', '/', $path );

		return str_replace( $clean_abspath, '/', $clean_path );
	}

} # class
