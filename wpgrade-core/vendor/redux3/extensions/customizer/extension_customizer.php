<?php

/**
 * Redux Framework is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 * Redux Framework is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Redux Framework. If not, see <http://www.gnu.org/licenses/>.
 * @package     ReduxFramework
 * @author      Dovy Paukstys (dovy)
 * @version     3.0.0
 */

if ( class_exists( 'WP_Customize_Control' ) ) {

	class Redux_Customize_Control extends WP_Customize_Control {

		public $type;

		/**
		 * All Redux fields will be extended from this class
		 * Here we can add redux classes to each field's container
		 * Render the control. Renders the control wrapper, then calls $this->render_content().
		 * @since 3.4.0
		 */
		protected function render() {
			$id             = 'customize-control-' . str_replace( '[', '-', str_replace( ']', '', $this->id ) );
			$class          = 'customize-control customize-control-' . $this->type;
			$fieldset_class = 'redux-field-container redux-field redux-container-' . $this->type;

			?>
			<li id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $class ); ?>">
			<fieldset class="<?php echo esc_attr( $fieldset_class ); ?>" data-id="<?php echo esc_attr( $this->option_key ); ?>">
				<?php $this->render_content(); ?>
			</fieldset>
			</li><?php
		}
	}
}

/**
 * First of all get all the custom controls classes
 */
$basepath  = dirname( __FILE__ );
$classpath = $basepath . DIRECTORY_SEPARATOR . 'controls' . DIRECTORY_SEPARATOR;
wpgrade::require_all( $classpath );


// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Don't duplicate me!
if ( ! class_exists( 'ReduxFramework_extension_customizer' ) ) {


	/**
	 * Main ReduxFramework customizer extension class
	 * @since       1.0.0
	 */
	class ReduxFramework_extension_customizer extends ReduxFramework {

		// Protected vars
		protected $redux;
		private $_extension_url;
		private $_extension_dir;
		private $parent;

		protected $localized_settings = null;

		/**
		 * Class Constructor. Defines the args for the extions class
		 * @since       1.0.0
		 * @access      public
		 *
		 * @param       array $sections   Panel sections.
		 * @param       array $args       Class constructor arguments.
		 * @param       array $extra_tabs Extra panel tabs.
		 *
		 * @return      void
		 */
		public function __construct( $parent ) {
			//add_action('wp_head', array( $this, '_enqueue_new' ));

			global $pagenow;
			if ( ( $pagenow !== "customize.php" && $pagenow !== "admin-ajax.php" && ! isset( $GLOBALS['wp_customize'] ) ) ) {
				return;
			}
			$this->localized_settings = array();
			$this->parent             = $parent;

			if ( empty( $this->_extension_dir ) ) {
				$this->_extension_dir = trailingslashit( str_replace( '\\', '/', dirname( __FILE__ ) ) );
				$this->_extension_url = site_url( str_replace( trailingslashit( str_replace( '\\', '/', ABSPATH ) ), '', $this->_extension_dir ) );
			}

			//			parent::__construct( $parent->sections, $parent->args );


			$reduxFr = new $parent;
			// Create defaults array
			$defaults = array();
			/*
			  customize_controls_init
			  customize_controls_enqueue_scripts
			  customize_controls_print_styles
			  customize_controls_print_scripts
			  customize_controls_print_footer_scripts
			*/

			add_action( 'wp_footer', array( $this, 'header_output' ), 9999999999 );

			add_action( 'customize_controls_enqueue_scripts', array(
					$parent,
					'_enqueue'
				), 0 ); // Customizer control scripts

			add_action( 'customize_register', array( $this, '_register_customizer_controls' ) ); // Create controls

			//add_action( 'wp_enqueue_scripts', array( &$this, '_enqueue_previewer_css' ) ); // Enqueue previewer css
			//add_action( 'wp_enqueue_scripts', array( &$this, '_enqueue_previewer_js' ) ); // Enqueue previewer javascript
			//add_action( 'customize_save', array( $this, 'customizer_save_before' ) ); // Before save
			//add_action( 'customize_save_after', array( &$this, 'customizer_save_after' ) ); // After save
			add_action( "load_textdomain", array( $this, '_override_values' ), 100 );
			//add_action( "wp_footer", array( $this, '_enqueue_new' ), 100 );
			//$this->_enqueue_new();

			add_action( 'customize_preview_init', array( $this, 'js_customizer_live_preview_enqueue' ), 99999 );
			add_action( 'customize_controls_enqueue_scripts', array( $this, 'js_customizer_enqueue' ) );


			//			add_action('customize_save', array($this, 'save_options_defaults'), 100);

			add_action( 'wp_ajax_reset_style_section', array( $this, 'reset_style_section' ) );
		}

		public function _override_values( $data ) {
			if ( isset( $_POST['customized'] ) ) {
				$options = json_decode( stripslashes_deep( $_POST['customized'] ), true );
				foreach ( $options as $key => $value ) {
					if ( strpos( $key, $this->parent->args['opt_name'] ) !== false ) {
						$key                                                       = str_replace( $this->parent->args['opt_name'] . '[', '', rtrim( $key, "]" ) );
						$GLOBALS[ $this->parent->args['global_variable'] ][ $key ] = $value;
					}
				}
			}
		}

		function save_options_defaults( $wp_customize ) {
			//			checkCSSRegen(); // Checks if I need to regen and does so
			//			set_theme_mod('regen-css', time()+3); // Waits 3 seconds until everything is saved

			$redux = new $this->parent;

			$redux->_set_options();
		}

		public function js_customizer_enqueue() {
			wp_enqueue_style( 'redux-extension-customizer-css', $this->_extension_url . 'assets/css/customizer.css' );
			wp_enqueue_script( 'redux-theme_customizer', wpgrade::coremoduleuri( 'redux3' ) . 'extensions/customizer/assets/js/theme_customizer.js', array(
					'jquery',
					'jquery-ui-slider'
				), '', true //Put script in footer?
			);

			wp_localize_script( 'redux-theme_customizer', 'theme_name', wpgrade::shortname() );
		}

		public function js_customizer_live_preview_enqueue() {
			wp_register_script( 'CSSOM', wpgrade::coremoduleuri( 'redux3' ) . 'extensions/customizer/assets/js/CSSOM.js', array( 'jquery' ), '', true //Put script in footer?
			);
			wp_register_script( 'cssUpdate', wpgrade::coremoduleuri( 'redux3' ) . 'extensions/customizer/assets/js/jquery.cssUpdate.js', array( 'jquery' ), '', true //Put script in footer?
			);
			wp_enqueue_script( 'redux-theme_customizer_preview', wpgrade::coremoduleuri( 'redux3' ) . 'extensions/customizer/assets/js/theme_customizer_preview.js', array(
					'jquery',
					'customize-preview',
					'CSSOM',
					'cssUpdate'
				), '', true //Put script in footer?
			);

			$this->localize_settings( 'redux-theme_customizer_preview' );
		}

		/**
		 * This will output the custom WordPress settings to the live theme's WP head.
		 * Used by hook: 'wp_head'
		 * @see   add_action('wp_head',$func)
		 * @since MyTheme 1.0
		 */
		public function header_output() {

			if ( ! isset( $GLOBALS['wp_customize'] ) ) {
				return;
			}

			// iterate through options and setup an style for those who need an embeded style
			foreach ( $this->parent->sections as $key => $section ) {
				// Not a type that should go on the customizer
				if ( empty( $section['fields'] ) || ( isset( $section['type'] ) && $section['type'] == "divide" ) ) {
					continue;
				}
				// If section customizer is set to false
				if ( isset( $section['customizer'] ) && $section['customizer'] === false ) {
					continue;
				}

				foreach ( $section['fields'] as $skey => $option ) {
					if ( isset( $option['customizer'] ) && $option['customizer'] === false ) {
						continue;
					}
					if ( $this->parent->args['customizer'] === false && ( ! isset( $option['customizer'] ) || ! is_array( $option['customizer'] ) ) ) {
						continue;
					}

					// @TODO maybe refactor here
					if ( ! isset( $option['customizer'] ) || ! is_array( $option['customizer'] ) ) {
						continue;
					}

					// to localize setting
					$tlcs = array();
					if ( isset( $option['customizer']['selector'] ) ) {
						$tlcs['selector'] = $option['customizer']['selector'];
					}
					if ( isset( $option['customizer']['rules'] ) ) {
						$tlcs['rules'] = $option['customizer']['rules'];
					}

					if ( isset( $option['customizer']['css_rules'] ) ) {
						$tlcs['css_rules'] = $option['customizer']['css_rules'];
					}

					if ( isset( $option['customizer']['transport'] ) ) {
						$tlcs['transport'] = $option['customizer']['transport'];
					}

					if ( isset( $option['type'] ) ) {
						$tlcs['type'] = $option['type'];
					}

					if ( ! isset( $tlcs['css_rules'] ) || ! is_array( $tlcs['css_rules'] ) ) {
						continue;
					}

					//					$option_value = wpgrade::option( $option['id'], $option['default'] );// ( isset($option['value'] ) ) ? $option['value'] : $option['default'];
					?>
					<style id="<?php echo $option['id'] ?>" type="text/css"><?php
						foreach ($tlcs['css_rules'] as $key => $rule ) {

							// rebuild the option value for each rule
							$option_value = wpgrade::option( $option['id'] );
							// get the rule
							wpgrade::display_dynamic_css_rule( $rule, $key, $option_value, $important = false );
						} ?>
					</style>
				<?php
				}
			}

		}

		public function _enqueue_new() {
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/codemirror.min.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/colors-control.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/customizer-control.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/fonts-customizer-admin.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/header-control.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/header-models.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/jquery.slimscroll.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/jquery.ui.droppable.min.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/media-editor.min.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/new-customizer.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/previewing.js'."'></script>";
			//echo "<script type='text/javascript' src='".$this->_extension_url . 'new/theme-customizer.js'."'></script>";

			/*
			wp_enqueue_script('redux-extension-customizer-codemirror-js', $this->_extension_url . 'new/codemirror.min.js');
			wp_enqueue_script('redux-extension-customizer-color-js', $this->_extension_url . 'new/colors-control.js');
			wp_enqueue_script('redux-extension-customizer-controls-js', $this->_extension_url . 'new/customizer-control.js');
			wp_enqueue_script('redux-extension-customizer-fonts-js', $this->_extension_url . 'new/fonts-customizer-admin.js');
			wp_enqueue_script('redux-extension-customizer-header-js', $this->_extension_url . 'new/header-control.js');
			wp_enqueue_script('redux-extension-customizer-models-js', $this->_extension_url . 'new/header-models.js');
			wp_enqueue_script('redux-extension-customizer-slimscroll-js', $this->_extension_url . 'new/jquery.slimscroll.js');
			wp_enqueue_script('redux-extension-customizer-droppable-js', $this->_extension_url . 'new/jquery.ui.droppable.min.js');
			wp_enqueue_script('redux-extension-customizer-editor-js', $this->_extension_url . 'new/media-editor.min.js');
			wp_enqueue_script('redux-extension-customizer-new-js', $this->_extension_url . 'new/new-customizer.js');
			wp_enqueue_script('redux-extension-customizer-previewing-js', $this->_extension_url . 'new/previewing.js');
			wp_enqueue_script('redux-extension-customizer-theme-js', $this->_extension_url . 'new/theme-customizer.js');
*/
		}

		// All sections, settings, and controls will be added here
		public function _register_customizer_controls( $wp_customize ) {

			$order    = array(
				'heading' => - 500,
				'option'  => - 500,
			);
			$defaults = array(
				'default-color'          => '',
				'default-image'          => '',
				'wp-head-callback'       => '',
				'admin-head-callback'    => '',
				'admin-preview-callback' => ''
			);

			foreach ( $this->parent->sections as $key => $section ) {

				// Not a type that should go on the customizer
				if ( empty( $section['fields'] ) && ( isset( $section['type'] ) && ( $section['type'] !== "divide" || $section['type'] !== "customizer_panel" ) ) ) {
					continue;
				}

				// If section customizer is set to false
				if ( isset( $section['customizer'] ) && $section['customizer'] === false ) {
					continue;
				}

				// No errors please
				if ( ! isset( $section['desc'] ) ) {
					$section['desc'] = "";
				}

				// Fill the description if there is a subtitle
				if ( empty( $section['desc'] ) && ! empty( $section['subtitle'] ) ) {
					$section['desc'] = $section['subtitle'];
				}

				// Let's make a section ID from the title
				if ( empty( $section['id'] ) ) {
					$section['id'] = strtolower( str_replace( " ", "", $section['title'] ) );
				}
				// No title is present, let's show what section is missing a title
				if ( ! isset( $section['title'] ) ) {
					print_r( $section );
				}
				// Let's set a default priority
				if ( empty( $section['priority'] ) ) {
					$section['priority'] = $order['heading'];
					$order['heading'] ++;
				}

				$priority = $section['priority'];
				if ( isset( $section['customizer_panel_priority'] ) ) {
					$priority = $section['customizer_panel_priority'];
				}

				$desc = '';
				if ( isset( $section['desc'] ) ) {
					$desc = $section['desc'];
				}

				if ( isset( $section['type'] ) ) {

					switch ( $section['type'] ) :

						case 'customizer_panel' : {

							$panel_args = array(
								'priority'    => $priority,
								'capability'  => 'manage_options',
								//'theme_supports' => '',
								'title'       => $section['title'],
								'description' => $desc,
							);
							$wp_customize->add_panel( $section['id'], $panel_args );

							break;
						}

						case 'customizer_section' : {

							$panel = '';

							if ( isset( $section['in_panel'] ) ) {
								$panel = $section['in_panel'];
							}

							$section_args = array(
								'title'    => $section['title'],
								'priority' => $priority,
								'panel'    => $panel
							);

							$wp_customize->add_section( $section['id'], $section_args );
							break;
						}

						default : {
							break;
						}

					endswitch;

				} else {
					$wp_customize->add_section( $section['id'], array(
						'title'    => $section['title'],
						'priority' => $section['priority'],
						//					'description' => $section['desc']
					) );
				}



				foreach ( $section['fields'] as $skey => $option ) {
					if ( isset( $option['customizer'] ) && $option['customizer'] === false ) {
						continue;
					}
					if ( $this->parent->args['customizer'] === false && ( ! isset( $option['customizer'] ) || ! is_array( $option['customizer'] ) ) ) {
						continue;
					}

					//Change the item priority if not set
					if ( $option['type'] != 'heading' && ! isset( $option['priority'] ) ) {
						$option['priority'] = $order['option'];
						$order['option'] ++;
					}

					if ( ! empty( $this->options_defaults[ $option['id'] ] ) ) {
						$option['default'] = $this->options_defaults['option']['id'];
					}

					//$option['id'] = $this->parent->args['opt_name'].'['.$option['id'].']';
					//echo $option['id'];

					if ( ! isset( $option['default'] ) ) {
						$option['default'] = "";
					}
					if ( ! isset( $option['title'] ) ) {
						$option['title'] = "";
					}

					$transport = 'refresh';
					if ( isset( $option['customizer']['transport'] ) ) {
						$transport = $option['customizer']['transport'];
					}

					$customSetting = array(
						'default'        => $option['default'],
						'type'           => 'option',
						'capabilities'   => 'manage_theme_options',
						'transport'      => $transport,
						'theme_supports' => '',
//						'sanitize_callback' => 'sanitize_text_field',
//						'sanitize_js_callback' =>array( &$parent, '_field_input' ),
					);

					$option_name  = $option['id'];
					$option['id'] = $this->parent->args['opt_name'] . '[' . $option['id'] . ']';

//					if (  $option['type'] == 'color' ) {
//						$customSetting['sanitize_callback'] = 'sanitize_hex_color';
//					}

					if ( $option['type'] != "heading" || ! empty( $option['type'] ) ) {
						$wp_customize->add_setting( $option['id'], $customSetting );
					}

					if ( ! empty( $option['data'] ) && empty( $option['options'] ) ) {
						if ( empty( $option['args'] ) ) {
							$option['args'] = array();
						}
						if ( $option['data'] == "elusive-icons" || $option['data'] == "elusive-icon" || $option['data'] == "elusive" ) {
							$icons_file = ReduxFramework::$_dir . 'inc/fields/select/elusive-icons.php';
							$icons_file = apply_filters( 'redux-font-icons-file', $icons_file );
							if ( file_exists( $icons_file ) ) {
								require_once $icons_file;
							}
						}
						$option['options'] = $this->parent->get_wordpress_data( $option['data'], $option['args'] );
					}

					switch ( $option['type'] ) {
						case 'heading':
							// We don't want to put up the section unless it's used by something visible in the customizer
							$section          = $option;
							$section['id']    = strtolower( str_replace( " ", "", $option['title'] ) );
							$order['heading'] = - 500;
							if ( ! empty( $option['priority'] ) ) {
								$section['priority'] = $option['priority'];
							} else {
								$section['priority'] = $order['heading'];
								$order['heading'] ++;
							}
							break;

						case 'text':
							if ( isset( $option['data'] ) && $option['data'] ) {
								continue;
							}
							$wp_customize->add_control( $option['id'], array(
								'label'    => $option['title'],
								'section'  => $section['id'],
								'settings' => $option['id'],
								'priority' => $option['priority'],
								'type'     => 'text',
							) );
							break;

						case 'select':
							if ( ( isset( $option['sortable'] ) && $option['sortable'] ) ) {
								continue;
							}
							$wp_customize->add_control( $option['id'], array(
								'label'    => $option['title'],
								'section'  => $section['id'],
								'settings' => $option['id'],
								'priority' => $option['priority'],
								'type'     => 'select',
								'choices'  => $option['options']
							) );
							break;

						case 'radio':
							//continue;
							$wp_customize->add_control( $option['id'], array(
								'label'    => $option['title'],
								'section'  => $section['id'],
								'settings' => $option['id'],
								'priority' => $option['priority'],
								'type'     => 'radio',
								'choices'  => $option['options']
							) );
							break;

						case 'checkbox':
							if ( ( isset( $option['data'] ) && $option['data'] ) || ( ( isset( $option['multi'] ) && $option['multi'] ) ) || ( ( isset( $option['options'] ) && ! empty( $option['options'] ) ) ) ) {
								continue;
							}
							$wp_customize->add_control( $option['id'], array(
								'label'    => $option['title'],
								'section'  => $section['id'],
								'settings' => $option['id'],
								'priority' => $option['priority'],
								'type'     => 'checkbox',
							) );
							break;

						case 'media':

							$wp_customize->add_control( new Redux_customizer_media( $wp_customize, $option['id'], array(
								'label'          => $option['title'],
								'section'        => $section['id'],
								'settings'       => $option['id'],
								'priority'       => $option['priority'],
								'type'           => 'media',
								'option_key'     => $option_name,
								'field'          => $option,
								'ReduxFramework' => $this->parent
							) ) );
							break;

						case 'color':
							$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, $option['id'], array(
								'label'    => $option['title'],
								'section'  => $section['id'],
								'settings' => $option['id'],
								'priority' => $option['priority']
							) ) );
							break;

						case 'switch':
							$wp_customize->add_control( new Redux_customizer_switch( $wp_customize, $option['id'], array(
								'label'          => $option['title'],
								'section'        => $section['id'],
								'settings'       => $option['id'],
								'priority'       => $option['priority'],
								'type'           => 'switch',
								'option_key'     => $option_name,
								'field'          => $option,
								'ReduxFramework' => $this->parent
							) ) );
							break;

						case 'customizer_slider':
							$wp_customize->add_control( new Redux_customizer_slider( $wp_customize, $option['id'], array(
								'label'          => $option['title'],
								'section'        => $section['id'],
								'settings'       => $option['id'],
								'priority'       => $option['priority'],
								'type'           => 'slider',
								'field'          => $option,
								'option_key'     => $option_name,
								'ReduxFramework' => $this->parent
							) ) );
							break;

						case 'customizer_typography':
							$wp_customize->add_control( new Redux_customizer_typography( $wp_customize, $option['id'], array(
								'label'          => $option['title'],
								'section'        => $section['id'],
								'settings'       => $option['id'],
								'priority'       => $option['priority'],
								'type'           => 'typography',
								'field'          => $option,
								'option_key'     => $option_name,
								'ReduxFramework' => $this->parent
							) ) );
							break;

						case 'customizer_info':
							$wp_customize->add_control( new Redux_customizer_info( $wp_customize, $option['id'], array(
								'label'          => $option['title'],
								'section'        => $section['id'],
								'settings'       => $option['id'],
								'priority'       => $option['priority'],
								'type'           => 'info',
								'field'          => $option,
								'option_key'     => $option_name,
								'ReduxFramework' => $this->parent
							) ) );
							break;

						case 'customizer_background':
							$wp_customize->add_control( new Redux_customizer_background( $wp_customize, $option['id'], array(
								'label'          => $option['title'],
								'section'        => $section['id'],
								'settings'       => $option['id'],
								'priority'       => $option['priority'],
								'type'           => 'customizer_bg',
								'field'          => $option,
								'option_key'     => $option_name,
								'ReduxFramework' => $this->parent
							) ) );
							break;

						default:
							break;
					}

					// @TODO Refactor for sure
					if ( ! isset( $option['customizer'] ) || ! is_array( $option['customizer'] ) ) {
						continue;
					}

					// to localize setting
					$tlcs = array();

					if ( isset( $option['customizer']['selector'] ) ) {
						$tlcs['selector'] = $option['customizer']['selector'];
					}

					if ( isset( $option['customizer']['negative_selector'] ) ) {
						$tlcs['negative_selector'] = $option['customizer']['negative_selector'];
					}

					if ( isset( $option['customizer']['rules'] ) ) {
						$tlcs['rules'] = $option['customizer']['rules'];
					}

					if ( isset( $option['customizer']['css_rules'] ) ) {
						$tlcs['css_rules'] = $option['customizer']['css_rules'];
					}

					if ( isset( $option['customizer']['transport'] ) ) {
						$tlcs['transport'] = $option['customizer']['transport'];
					}

					if ( isset( $option['type'] ) ) {
						$tlcs['type'] = $option['type'];
					}

					$this->to_localize( $option['id'], $tlcs );
				}
			}
		}

		public function customizer_save_before( $plugin_options ) {

			//$parent->_field_input( $plugin_options );

		}

		public function customizer_save_after( $wp_customize ) {
			//echo "there";
			//      print_r($wp_customize);
			//exit();
			//return $wp_customize;

		}

		/**
		 * Enqueue CSS/JS for preview pane
		 * @since       1.0.0
		 * @access      public
		 * @global      $wp_styles
		 * @return      void
		 */
		public function _enqueue_previewer() {
			wp_enqueue_script( 'redux-extension-previewer-js', $this->_extension_url . 'assets/js/preview.js' );
			$localize = array(
				'save_pending'   => __( 'You have changes that are not saved. Would you like to save them now?', 'redux-framework' ),
				'reset_confirm'  => __( 'Are you sure? Resetting will lose all custom values.', 'redux-framework' ),
				'preset_confirm' => __( 'Your current options will be replaced with the values of this preset. Would you like to proceed?', 'redux-framework' ),
				'opt_name'       => $this->args['opt_name'],
				//'folds'       => $this->folds,
				'options'        => $this->parent->options,
				'defaults'       => $this->parent->options_defaults,
			);
			wp_localize_script( 'redux-extension-previewer-js', 'reduxPost', $localize );
		}

		/**
		 * Enqueue CSS/JS for the customizer controls
		 * @since       1.0.0
		 * @access      public
		 * @global      $wp_styles
		 * @return      void
		 */
		public function _enqueue() {

			global $wp_styles;

			// Remove when code is in place!
			//			wp_enqueue_script('redux-extension-customizer-js', $this->_extension_url . 'assets/js/customizer.js');
			// Get styles
			//			wp_enqueue_style('redux-extension-customizer-css', $this->_extension_url . 'assets/css/customizer.css');
			//
			//
			//			wp_register_script(
			//				'reduxcustomizer-vendor', wpgrade::coremoduleuri('redux3') . 'assets/js/vendor.min.js',
			//				array( 'jquery' )
			//			);
			//
			//			wp_enqueue_script(
			//				'select2-js',
			//				wpgrade::coremoduleuri('redux3') . 'assets/js/vendor/select2/select2.min.js',
			//				array( 'jquery' )
			//			);
			//
			//			wp_enqueue_script(
			//				'reduxcustomizer-js', wpgrade::coremoduleuri('redux3') . 'assets/js/redux.js',
			//				array( 'jquery', 'select2-js', 'ace-editor-js', 'reduxcustomizer-vendor' )
			//			);
			//
			//			$localize = array(
			//				'save_pending'      => __( 'You have changes that are not saved.  Would you like to save them now?', 'redux-framework' ),
			//				'reset_confirm'     => __( 'Are you sure?  Resetting will lose all custom values.', 'redux-framework' ),
			//				'preset_confirm'    => __( 'Your current options will be replaced with the values of this preset.  Would you like to proceed?', 'redux-framework' ),
			//				'opt_name'          => $this->args['opt_name'],
			//				//'folds'       => $this->folds,
			//				'field'     => $this->parent->options,
			//				'defaults'      => $this->parent->options_defaults,
			//			);
			//
			//			// Values used by the javascript
			//			wp_localize_script(
			//				'redux-js',
			//				'redux_opts',
			//				$localize
			//			);
			//
			//			do_action( 'redux-enqueue-' . $this->args['opt_name'] );
			//
			//			foreach( $this->parent->sections as $section ) {
			//
			//				if( isset( $section['fields'] ) ) {
			//					foreach( $section['fields'] as $field ) {
			//						if( isset( $field['type'] ) ) {
			//
			//							$field_class = 'ReduxFramework_' . $field['type'];
			//							if( !class_exists( $field_class ) ) {
			//								$class_file = apply_filters( 'redux-typeclass-load', $this->path . 'inc/fields/' . $field['type'] . '/field_' . $field['type'] . '.php', $field_class );
			//
			//
			//								if( $class_file === 'inc/fields/slider/field_slider.php') {
			//									/** @noinspection PhpIncludeInspection */
			//									require_once( wpgrade::corepath() . 'vendor/redux3/' . $class_file );
			//
			//								}
			//							}
			//							if( class_exists( $field_class ) && method_exists( $field_class, 'enqueue' ) ) {
			//								$enqueue = new $field_class( '', '', $this );
			//								$enqueue->enqueue();
			//							}
			//						}
			//					}
			//				}
			//			}
		}

		/**
		 * Register Option for use
		 * @since       1.0.0
		 * @access      public
		 * @return      void
		 */
		public function _register_setting() {


		}

		/**
		 * Validate the options before insertion
		 * @since       3.0.0
		 * @access      public
		 *
		 * @param       array $plugin_options The options array
		 *
		 * @return
		 */
		public function _field_validation( $plugin_options, $two ) {
			echo "dovy";
			echo $two;

			return $plugin_options;

			return $this->parent->_validate_options( $plugin_options );
		}


		/**
		 * HTML OUTPUT.
		 * @since       1.0.0
		 * @access      public
		 * @return      void
		 */
		public function _customizer_html_output() {


		}

		// Methods to localize settings

		public function to_localize( $key, $setting ) {

			if ( empty( $setting ) ) {
				return;
			}

			$this->localized_settings[ $key ] = $setting;
		}

		public function localize_settings( $key ) {
			wp_localize_script( $key, 'settings_config', $this->localized_settings );
		}

		/**
		 * This is a wpgrade specific hook!
		 * @TODO Maybe refactor it in the future to work in redux extension
		 */
		public function reset_style_section() {

			check_ajax_referer( 'reset-style-section', 'security' );

			$defaults = wpgrade::get_redux_defaults();
			$sections = wpgrade::get_redux_sections();

			if ( ! empty( $sections ) ) {
				foreach ( $sections as $section ) {
					if ( isset( $section['customizer_only'] ) && ! empty( $section['customizer_only'] ) && isset( $section['fields'] ) && ! empty( $section['fields'] ) ) {
						foreach ( $section['fields'] as $field ) {
							if ( isset( $field['id'] ) && isset( $defaults[ $field['id'] ] ) ) {
								$default_value = $defaults[ $field['id'] ];
								wpgrade::setoption( $field['id'], $default_value );
							}
						}
					}
				}
			}
		}
	} // class
} // if

function search_multi( $array, $key, $value ) {
	$results = array();

	if ( is_array( $array ) ) {
		if ( isset( $array[ $key ] ) && $array[ $key ] == $value ) {
			$results[] = $array;
		}

		foreach ( $array as $subarray ) {
			$results = array_merge( $results, search_multi( $subarray, $key, $value ) );
		}
	}

	return $results;
}