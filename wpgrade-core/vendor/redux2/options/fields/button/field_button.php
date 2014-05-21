<?php
class Redux_Options_button {

    /**
     * Field Constructor.
     *
     * Required - must call the parent constructor, then assign field and value to vars, and obviously call the render field function
     *
     * @since Redux_Options 1.0.0
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
     * @since Redux_Options 1.0.0
    */
    function render() {
        $class = (isset($this->field['class'])) ? 'class="' . $this->field['class'] . ' button" ' : 'class="button"';
		$url = (isset($this->field['url'])) ? $this->field['url'] : '#';
        echo '<a href="'.$url.'" '.$class.'>'.$this->field['title'].'</a>';
    }
}
