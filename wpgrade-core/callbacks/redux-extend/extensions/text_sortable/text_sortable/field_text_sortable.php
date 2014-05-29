<?php

class ReduxFramework_text_sortable {

	/**
	 * Field Constructor.
	 * Required - must call the parent constructor, then assign field and value to vars, and obviously call the render field function
	 * @since Redux_Options 2.0.1
	 */
	function __construct( $field = array(), $value = '', $parent ) {
		$this->field = $field;
		$this->value = $value;
		$this->args  = $parent->args;

		if ( empty( $this->extension_dir ) ) {
			$this->extension_dir = trailingslashit( str_replace( '\\', '/', dirname( __FILE__ ) ) );
			$this->extension_url = site_url( str_replace( trailingslashit( str_replace( '\\', '/', ABSPATH ) ), '', $this->extension_dir ) );
		}

		// Set default args for this field to avoid bad indexes. Change this to anything you use.
		$defaults    = array(
			'options'          => array(),
			'stylesheet'       => '',
			'output'           => true,
			'enqueue'          => true,
			'enqueue_frontend' => true
		);
		$this->field = wp_parse_args( $this->field, $defaults );
	}

	/**
	 * Field Render Function.
	 * Takes the vars and outputs the HTML for the field in the settings
	 * @since Redux_Options 2.0.1
	 */
	function render() {
		$class   = ( isset( $this->field['class'] ) ) ? $this->field['class'] : '';
		$options = $this->field['options'];
		echo '<ul class="text_sortable ' . $class . '">';

		if ( ! empty( $this->field['checkboxes'] ) ) {
			echo '<li class="head">';
			echo '<span class="spacer" style="display: inline-block; width: 415px;">&nbsp;</span>';

			foreach ( $this->field['checkboxes'] as $key => $name ) {
				echo '<span class="checkbox_header ' . $key . '-head"><b>' . $name . '</b></span>';
			}

			echo '</li>';
		}

		if ( isset( $this->value ) && is_array( $this->value ) ) {
			foreach ( $this->value as $k => $nicename ) {
				$field = ! empty( $this->value[ $k ] ) ? $this->value[ $k ] : '';

				if ( ! empty( $field ) ) {

					$value_display = '';

					if ( isset( $field['value'] ) && ! empty( $field['value'] ) ) {
						$value_display = $field['value'];
					}

					echo '<li>';
					echo '<label for="' . $this->field['id'] . '[' . $k . ']"><strong>' . $options[ $k ] . ':</strong></label>';
					echo '<input rel="' . $this->field['id'] . '-' . $k . '-hidden" type="text" id="' . $this->field['id'] . '[' . $k . ']" name="' . $this->args['opt_name'] . '[' . $this->field['id'] . '][' . $k . '][value]" value="' . esc_attr( $value_display ) . '" />';

					if ( isset( $this->field['checkboxes'] ) && ! empty( $this->field['checkboxes'] ) ) {
						foreach ( $this->field['checkboxes'] as $key => $name ) {
							$checked = ! empty( $this->value[ $k ]['checkboxes'][ $key ] ) ? 'value="' . $this->value[ $k ]['checkboxes'][ $key ] . '" checked="checked"' : '';
							echo '<input type="checkbox" name="' . $this->args['opt_name'] . '[' . $this->field['id'] . '][' . $k . '][checkboxes][' . $key . ']" ' . $checked . '/>';
						}
					}

					echo '<span class="compact drag"><i class="icon-move icon-large"></i></span>';
					echo '</li>';
					//remove this entry from options
					if ( isset( $options[ $k ] ) ) {
						unset( $options[ $k ] );
					}
				}
			}

			//if we still have options left
			//show the empty options
			if ( ! empty( $options ) ) {
				foreach ( $options as $k => $nicename ) {
					$value_display = isset( $this->value[ $k ] ) ? $this->value[ $k ] : '';
					echo '<li>';
					echo '<label for="' . $this->field['id'] . '[' . $k . ']"><strong>' . $nicename . ':</strong></label>';
					echo '<input rel="' . $this->field['id'] . '-' . $k . '-hidden" type="text" id="' . $this->field['id'] . '[' . $k . ']" name="' . $this->args['opt_name'] . '[' . $this->field['id'] . '][' . $k . '][value]" />';
					foreach ( $this->field['checkboxes'] as $key => $name ) {
						echo '<input type="checkbox" name="' . $this->args['opt_name'] . '[' . $this->field['id'] . '][' . $k . '][checkboxes][' . $key . ']"/>';
					}
					echo '<span class="drag"><i class="icon-move icon-large"></i></span>';
					echo '</li>';
				}
			}
		} else {
			foreach ( $options as $k => $nicename ) {
				$value_display = isset( $this->value[ $k ] ) ? $this->value[ $k ] : '';
				echo '<li>';
				echo '<label for="' . $this->field['id'] . '[' . $k . ']"><strong>' . $nicename . ':</strong></label>';
				echo '<input rel="' . $this->field['id'] . '-' . $k . '-hidden" type="text" id="' . $this->field['id'] . '[' . $k . '][value]" name="' . $this->args['opt_name'] . '[' . $this->field['id'] . '][' . $k . '][value]" value="' . esc_attr( $value_display ) . '" />';
				foreach ( $this->field['checkboxes'] as $key => $name ) {
					echo '<input type="checkbox" name="' . $this->args['opt_name'] . '[' . $this->field['id'] . '][' . $k . '][checkboxes][' . $key . ']"/>';
				}
				echo '<span class="drag"><i class="icon-move icon-large"></i></span>';
				echo '</li>';
			}
		}
		echo '</ul>';
	}

	function enqueue() {

		wp_enqueue_script( 'redux-field-text-sortable-js', $this->extension_url . '/field_text_sortable.js', array( 'jquery' ), time(), true );

		wp_enqueue_style( 'redux-field-text-sortable-css', $this->extension_url . 'field_text_sortable.css', time(), true );
	}
}
