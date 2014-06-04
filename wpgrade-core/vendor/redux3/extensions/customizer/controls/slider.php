<?php
if ( class_exists('WP_Customize_Control') ) {

	class Redux_customizer_slider extends Redux_Customize_Control {

		public $type = 'slider';
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

			$field_class = 'ReduxFramework_customizer_slider';
			if( !class_exists( $field_class ) ) {
				$class_file = apply_filters( 'redux-typeclass-load', '/inc/fields/slider/field_slider.php', $field_class );
				if( $class_file === 'inc/fields/slider/field_slider.php') {
					/** @noinspection PhpIncludeInspection */
					require_once( wpgrade::corepath() . 'vendor/redux3/' . $class_file );
				}
			}

			$value = wpgrade::option($field['id'], 0);
			if( class_exists( $field_class ) && method_exists( $field_class, 'render' ) ) {
				$enqueue = new $field_class( $field, $value, $this->ReduxFramework );
//				$enqueue->enqueue();

				echo "<label>".
					"<span class=\"customize-control-title\">". $field['title'] ."</span>" .
					"</label>";

				echo '<div class="redux-container-'. $this->type . '">';
				echo( $enqueue->render());
				echo '<div>';
			}

		}
	}
}