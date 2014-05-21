<?php

use Behat\Behat\Context\ClosuredContextInterface,
	Behat\Behat\Context\TranslatedContextInterface,
	Behat\Behat\Context\BehatContext,
	Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
	Behat\Gherkin\Node\TableNode;
use Behat\MinkExtension\Context\MinkDictionary;

// ensure EXT is defined
if ( ! defined('EXT')) {
	define('EXT', '.php');
}

require realpath(dirname(__FILE__)).'/../../wpgrade'.EXT;

/**
 * Features context.
 */
class FeatureContext extends BehatContext {
	use MinkDictionary;

//// Dictionary Extras /////////////////////////////////////////////////////////

	/**
	 * @Given /^I wait (\d+)s$/
	 */
	function iWait($seconds) {
		try {
			$this->getSession()->wait(1000 * $seconds);
		}
		catch (\Exception $e) {
			// unimportant driver error, continue
		}
	}

	/**
	 * @Given /^I fill in form element "([^"]*)" with "([^"]*)"$/
	 */
	function iFillInFormElementWith($selector, $value) {
		$element = $this->getSession()
			->getPage()
			->find("css", $selector);

		if ($element) {
			$element->setValue($value);
		}
		else { # failure
			throw new \Exception('The element "'.$selector.'" could not be found on the page.');
		}
	}

	/**
	 * @Given /^I trigger "([^"]*)" on "([^"]*)"$/
	 */
	function iTriggerOn($trigger, $selector) {
		$this->getSession()
			->executeScript('$("'.$selector.'").trigger("'.$trigger.'");');
	}

	/**
	 * @Given /^I click "([^"]*)"$/
	 */
	function iClick($selector) {
		$element = $this->getSession()
			->getPage()
			->find("css", $selector);

		if ($element) {
			$element->click();
		}
		else { # failure
			throw new \Exception('The element "'.$selector.'" could not be found on the page.');
		}
	}

	/**
	 * @Then /^status should be OK$/
	 */
	function statusShouldBeOk() {
		$this->assertSession()->statusCodeEquals(200);
	}

	/**
	 * @Then /^status should be "([^"]*)"$/
	 */
	function statusShouldBeStatus($status) {
		$this->assertSession()->statusCodeEquals((int) $status);
	}

	/**
	 * @Given /^I open "([^"]*)"$/
	 */
	function iOpen($relative_url) {
		$this->visit(wpgrade::features_testurl().ltrim($relative_url, '/'));
	}

	/**
	 * @Then /^the test site is compatible with wptest\.io$/
	 */
	function ensureTestframeworkCompliance() {
		$this->iOpen('/');
		$this->assertPageContainsText("Michael Novotny");
	}

	/**
	 * @Then /^there should be a link "([^"]*)"$/
	 */
	function thereShouldBeALink($url) {
		if (preg_match('#^https?://.*$#', $url)) {
			$link = $url;
		}
		else { # assume relative url
			$link = wpgrade::features_testurl().ltrim($url, '/');
		}

		try {
			$this->assertSession()->elementExists('css', "a[href='$link']");
		}
		catch (Exception $e) {
			throw new Exception("Could not find link [$link] on page.");
		}
	}

	/**
	 * @Given /^there should be an image "([^"]*)"$/
	 */
	function thereShouldBeAnImage($imagename) {
	    try {
	    	$this->assertSession()->elementExists('css', "img[alt='$imagename']");
	    }
	    catch (Exception $e) {
	    	try {
	    		$this->assertSession()->elementExists('css', "img[title='$imagename']");
	    	}
	    	catch (Exception $e) {
	    		throw new Exception('Could not find any image with a title or alt attribute matching "'.$imagename.'"');
	    	}
	    }
	}

} # class
