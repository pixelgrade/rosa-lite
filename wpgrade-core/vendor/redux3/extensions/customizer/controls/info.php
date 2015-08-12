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

			$manager = $this->manager;
			$ul_class = 'accordion-section-content bottom';
			// add another class for wp 4.3+
			if ( method_exists( $manager, 'register_section_type' ) ) {
				$ul_class = 'dropdown_info_section_break';
			}

			echo '</fieldset></li></ul>';
			echo '<ul class="' . $ul_class . '" ><li><fieldset>';

//			echo '</fieldset></li></ul>';
//			echo '<ul class="myul"><li class="thiscustomli"><fieldset class="fieldinfoset">';

			if ( isset( $field['title'] ) ) {
				echo $field['title'];
			}
		}
	}
}