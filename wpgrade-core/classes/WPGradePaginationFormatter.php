<?php

/* This file is property of Pixel Grade Media. You may NOT copy, or redistribute
 * it. Please see the license that came with your copy for more information.
 */

/**
 * @package    wpgrade
 * @category   core
 * @author     Pixel Grade Team
 * @copyright  (c) 2013, Pixel Grade Media
 */
class WPGradePaginationFormatter {

	/** @var mixed query */
	protected $query = null;

	/** @var array configuration */
	protected $conf = null;

	/** @var string pagination type (paged, page) */
	protected $pager = null;

	/**
	 * You may set the pager configuration value to either page or paged to
	 * switch the pagination from showing post listings to showing post
	 * segments.
	 *
	 * @param mixed query
	 * @param array configuration
	 */
	function __construct($query, $conf = null) {
		if ($conf === null) {
			$conf = array();
		}

		$this->query = $query;

		$config = wpgrade::config();
		$config_defaults = $config['pagination'];

		// the pager determines what we're paginating (ie. "paged" for listing
		// of posts, and "page" for post parts)
		if (isset($conf['pager'])) {
			$this->pager = $conf['pager'];
		}
		else if (isset($config_defaults['pager'])) {
			$this->pager = $config_defaults['pager'];
		}
		else { // no pager configuration entry
			// fallback to listing pagination
			if ( is_front_page() && is_page() ){
				$this->pager = 'page';
			} else {
				$this->pager = 'paged';
			}
		}

		$this->conf = wpgrade::merge($config_defaults, $conf);
	}

	/**
	 * @param type $pager
	 */
	protected function pager_format($pager) {
		global $wp_rewrite;

		// are we using pretty permalinks?
		if ($wp_rewrite->using_mod_rewrite_permalinks()) {
			return "/$pager/%#%";
		}
		else { // not using pretty permalinks
			return "?$pager=%#%";
		}
	}

	protected function setup() {
		// the boring defaults that are ommited in the wpgrade-config.php
		// configuration for clarity and bravity, and also because some require
		// extensive logic handling
        
		$defaults = array
			(
				// dynamically resolve to pretty or non-pretty base
				'base' => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),

				// link format, "/$pager/%#%" or "?$pager=%#%"
				'format' => $this->pager_format($this->pager),

				// current page
				'current' => max(1, get_query_var($this->pager)),

				// total pages
				'total' => $this->query->max_num_pages,

				// function to process links
				'formatter' => null,

				// show prev/next links?
				'prev_next' => true,

				#
				# Intentionally ommiting prev_text and next_text, see term
				# checks after configuration merge
				#

				// are the terms used for paging relative to the sort order?
				// ie. older/newer instead of sorting agnostic previous/next
				'sorted_paging' => false,

				// the order of the posts (asc or desc); if asc is passed and
				// sorted_paging is true the values of prev_text and next_text
				// will be flipped
				'order' => 'desc',

				// show all pages? (ie. no cutoffs)
				'show_all' => false,

				// how many numbers on either the start and the end list edges
				'end_size' => 1,

				// how many numbers to either side of current page
				// not including current page
				'mid_size' => 2,

				// an array of query args to add
				'add_args' => false,

				// a string to append to each link
				'add_fragment' => null,
			);

		$conf = wpgrade::merge($defaults, $this->conf);

		# we're filling in prev_text and next_text seperatly to avoid
		# requesting the translation when not required

		if (empty($conf['prev_text'])) {
			$conf['prev_text'] = __('&laquo; Previous', wpgrade::textdomain());
		}
		else { // exists; translate
			$conf['prev_text'] = __($conf['prev_text'], wpgrade::textdomain());
		}

		if (empty($conf['next_text'])) {
			$conf['next_text'] = __('Next &raquo;', wpgrade::textdomain());
		}
		else { // exists; translate
			$conf['next_text'] = __($conf['next_text'], wpgrade::textdomain());
		}

		// is the pager sorted?
		if ($conf['sorted_paging'] && $conf['order'] == 'asc') {
			$temp = $conf['prev_text'];
			$conf['prev_text'] = $conf['next_text'];
			$conf['next_text'] = $temp;
		}

		return $conf;
	}

	/**
	 * @return string
	 */
	function render() {
		$conf = $this->setup();

		// processing return type
		$conf['type'] = 'array';
        
		$links = paginate_links($conf);

		if (empty($links)) {
			$links = array();
		}

		if ($conf['formatter'] !== null) {
			return call_user_func($conf['formatter'], $links, $conf);
		}
		else { // formatter === null
			return implode('', $links);
		}
	}

} # class
