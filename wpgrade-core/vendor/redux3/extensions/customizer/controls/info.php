<?php

if ( class_exists('WP_Customize_Control') ) {
	class Redux_customizer_info extends Redux_Customize_Control {

		public $type = 'customizer_info';
		public $custom_data;
		public $ReduxFramework;
		public $option_key;

		/**
		 * A custom render for sliders in customizer panel
		 */
		public function render_content() {

			$field = search_multi($this->ReduxFramework->sections, 'id', $this->option_key);
			// the key is always unique so there will be only one
			$field = $field[0];

			if ( !isset( $field['name_suffix'] ) ) {
				$field['name_suffix'] = "";
			}
			if ( !isset( $field['default'] ) ) {
				$field['default'] = array();
			}

			$field['custom_data'] = $this->get_link();

			echo '</fieldset></li></ul>';
			echo '<ul class="accordion-section-content bottom" ><li><fieldset>';
			if ( isset($field['title']) ) {
				echo $field['title'];
			}
		}
	}
}