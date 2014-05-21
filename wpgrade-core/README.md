[![Build Status](http://jenkins.pixelgrade.com:8080/buildStatus/icon?job=wpgrade-core)](http://jenkins.pixelgrade.com:8080/job/wpgrade-core/)

General system classes are located in this section.

[!!] Please DO NOT add theme cssor other theme specific information

General guidelines:

 * classes should not echo out anything, with the exception of methods in
   functions.php

 * classes should not assume anything outside of what's provided
   in wpgrade-config.php

 * declaration of functions is not allowed; if you need a function-like
   construct declare a static method in the class wpgrade located
   in functions.php

 * all classes/methods should have tests written in tests

 * check your code before submitting :) you can roughly determine if your new
   class or method has been executed correctly by checking the code coverage
   report
