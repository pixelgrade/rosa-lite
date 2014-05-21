Feature: error pages
  In order to comply with web standards and UX standards
  As a registered/unregistered user
  I need to see a proper error pages when accessing a invalid url

  Scenario: parachuted on a potentially previously valid url
    Given I open "?p=99999"
     Then status should be "404"
      And I should see "Search"