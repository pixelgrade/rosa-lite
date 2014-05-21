#!/bin/sh

#
# Test entire library
#

cd "$(dirname "$0")"
cd library/
behat -c behat.yml
