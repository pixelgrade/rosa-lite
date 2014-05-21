<?php
class Redux_Options_raw_html_option {

    /**
     * Field Constructor.
     *
     * Required - must call the parent constructor, then assign field and value to vars, and obviously call the render field function
     *
     * @since Redux_Options 2.0.1
     */
    function __construct($field = array(), $value ='', $parent) {
        $this->field = $field;
        $this->value = $value;
        $this->args = $parent->args;
    }

    /**
     * Field Render Function.
     *
     * Takes the vars and outputs the HTML for the field in the settings
     *
     * @since Redux_Options 2.0.1
     */
    function render() {
        echo '<div>' . $this->field['html'] . '</div>';
    }
}
