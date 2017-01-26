# automated-tests
A scaffold for automated wordpress tests.

### Php

1. Clone this (scaffold) repo to `app/src/wp-content/plugins/myplugin/tests`.

  ```
  cd app/src/wp-content/plugins/myplugin/
  git clone git@github.com:pixelgrade/automated-tests.git tests
  ```

2. Configure our test environment:

  - in apache.ci.conf, replace plugin_name and ServerName:

    ```
    DocumentRoot /home/ubuntu/[plugin_name]/wordpress
    ServerName myhostname.dev
    ```

  - in bootstrap.php, on line 7 replace the $plugin_file variable with your plugin's main .php file's name.

3. Install phpunit. 

  If you're using a remote installation (i.e. a virtual machine like Pressmatic + Docker) - this should be done on the virtual server. A quick guide on how to install phpunit on ubuntu can be found [here](https://github.com/sebastianbergmann/phpunit#installation).

4. From the `tests` directory, run: 

  `bash install-wp-tests.sh wordpress_test root '' localhost latest`
  ...to get a new test wordpress test install.
  
  Replace “root” with the username of your database and replace ” with the database password. Also replace “localhost” with the hostname of your database. You can find all three of these values in your wp-config.php file.

5. Run the testsuite

  - from your /tests directory run the tests with `phpunit`. 

  * Since we've enabled phpunit, in `phpunit.xml.dist`, to run testsuites for all files containing the "test-" prefix and ending with the ".php" sufix - naming our test classes correctly will be enough for phpunit to know which tests to run.

