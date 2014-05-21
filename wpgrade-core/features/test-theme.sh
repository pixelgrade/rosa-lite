#!/bin/sh

#
# Test theme features
#

cd "$(dirname "$0")"
cd enabled/
behat -c behat.yml
