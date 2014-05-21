#!/bin/sh

#
# Test features marked with @this features in library/
#
# Simply add @this on the line before Feature or alternatively before Scenario
# to run only them with this command; shortening development time.
#

cd "$(dirname "$0")"
cd library/
behat -c behat.yml --tags '@this'
