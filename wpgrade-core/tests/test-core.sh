cd "$(dirname "$0")"
cd ../..
phpunit --bootstrap wpgrade-core/tests/bootstrap.php --coverage-html wpgrade-core/tests/report wpgrade-core/tests
