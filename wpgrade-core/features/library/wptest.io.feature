@this
Feature: wordpress wptest.io compliance
  In order to ensure compatibility with default wordpress
  As an unregistered user
  I need to succesfully verify all wptest.io tests

  Background:
    Given the test site is compatible with wptest.io

  Scenario: navigation
    Given I open "/"
     Then I should see "About"
      And I should see "Categories"
      And I should see "Search"
      And I should see "Recent Posts"
      And I should see "Recent Comments"
      And I should see "Archives"
      And I should see "Categories"
      And I should see "Meta"

  Scenario: About page
    Given I open "/"
      And I follow "About"
     Then I should see "make WordPress testing easier and resilient"

  Scenario: Sticky post
    Given I open "/"
     Then I should see "Sticky"
    Given I follow "Sticky"
     Then I should see "This is a sticky post."

  Scenario: Hidden Posts
   Given I open "/"
    Then I should not see "SCHEDULED"
     And I should not see "Draft"
     And I should not see "It should not be displayed by the theme."

  Scenario: Tiled Gallery
    Given I open "/"
     Then I should see "Tiled Gallery"
    Given I follow "Tiled Gallery"
     Then I should see "This is a test for Jetpack’s Tiled Gallery."
      And there should be an image "The Dark Knight Rises"
      And there should be an image "Iron Man 2"
      And there should be an image "The Amazing Spider Man"
      And there should be an image "Fight Club"
      And there should be an image "Man Of Steel"
    Given I open "tiled-gallery/ironman-2/"
     Then there should be an image "Iron Man 2"

  Scenario: Twitter Embeds
    Given I open "/"
     Then I should see "Twitter Embeds"
    Given I follow "Twitter Embeds"
     Then I should see "Carl Smith"
      And I should see "the path to an innovative future"

  Scenario: Fatured Image
    Given I open "/"
     Then there should be an image "Horizontal Featured Image"
      And there should be an image "Vertical Featured Image"
    Given I open "/featured-image-vertical/"
     Then there should be an image "Vertical Featured Image"
    Given I open "/featured-image-horizontal/"
     Then there should be an image "Horizontal Featured Image"

  Scenario: Image Caption
    Given I open "/image-alignment/"
     Then I should see "Itty-bitty caption."
      And I should see "Massive image comment for your eyeballs."
      And I should see "Feels good to be right all the time."

  Scenario: More Tag
    Given I open "/"
     Then I should see "This content is before the more tag."
      And I should not see "this content is after the more tag."
    Given I open "/more-tag/"
     Then I should see "this content is after the more tag"

  Scenario: Excerpt
    Given I open "/"
     Then I should see "This is a post excerpt."
      And I should not see "This is the post content."
    Given I open "/excerpt/"
     Then I should not see "This is a post excerpt."
      And I should see "This is the post content."

  Scenario: older posts link
    Given I open "/"
     Then there should be a link "/page/2/"
    Given I open "/page/2/"
     Then I should see "Paginated"

  Scenario: Paginated
    Given I open "/page/2/"
     Then I should see "Post Page 1"
      And I should see "Pages:"
      And there should be a link "/paginated/2/"
    Given I open "/paginated/2/"
     Then I should see "Post Page 2"
      And I should see "Pages:"
      And there should be a link "/paginated/3/"
    Given I open "/paginated/3/"
     Then I should see "Post Page 3"
      And I should see "Pages:"
      And there should be a link "/paginated/2/"

  Scenario: Post with out title
    Given I open "/page/2/"
     Then there should be a link "/no-title/"

  Scenario: Password Protected
    Given I open "/password-protected/"
     Then I should see a "input[name='post_password']" element
      And I should not see "should not be visible until the password is entered"
    Given I fill in "post_password" with "badpassword"
     Then I should not see "should not be visible until the password is entered"
      And I should see a "input[name='post_password']" element
    Given I fill in "post_password" with "enter"
      And I press "Submit"
     Then I should see "should not be visible until the password is entered"

 Scenario: Comments
   Given I open "/comments/"
    Then there should be a link "/comments/comment-page-2/#comments"
     And I should see "We use these tests all the time"
     And I should see "Thanks for all the comments, everyone!"
     And I should not see "Author Comment."
     And I should not see "We are totally going to blog about these tests!"
   Given I open "/comments/comment-page-2/"
    Then I should not see "We use these tests all the time"
     And I should see "Author Comment."
     And I should see "Comment Depth 01"
     And I should see "Comment Depth 02"
     And I should see "Comment Depth 03"
     And I should see "Comment Depth 04"
     And I should see "Comment Depth 05"
     And I should see "Comment Depth 06"
     And I should see "Comment Depth 07"
     And I should see "Comment Depth 08"
     And I should see "Comment Depth 09"
     And I should see "Comment Depth 10"
     And I should see "Video comment."
     And I should see an "iframe[src='http://www.youtube.com/embed/9bZkp7q19f0']" element
     And I should see "Image comment."
     And I should see an "img[alt='I Am Worth Loving Wallpaper']" element
     And I should see "We are totally going to blog about these tests!"
   Given I open "/comments/comment-page-1/#comments"
    Then there should be a link "/comments/comment-page-2/#comments"
     And I should see "These tests are amazing!"
     And I should see "focus means saying yes"
     And there should be a link "http://tommcfarlin.com/"
     And I should see "Anonymous User"
     And I should not see "Author Comment."
     And I should not see "We are totally going to blog about these tests!"
     And I should not see "We use these tests all the time"

  Scenario: Pingbacks and Trackbacks
    Given I open "/pingbacks-an-trackbacks/"
     Then I should see "Ping 1"
      And I should see "Ping 2"
      And I should see "Ping 3"
      And I should see "Ping 4"
      And I should see "What’s a tellyworth?"
      And I should see "with a much longer title than the previous ping"

  Scenario: Post Format: Standard
    Given I open "/post-format-standard/"
     Then I should see "How do I harvest?"
      And I should see "Walk away from your keyboard"

  Scenario: Post Format: Gallery
    Given I open "/post-format-gallery/"
     Then there should be an image "canola"
      And I should see "Lorem ipsum dolor sit amet"
      And there should be an image "dsc20050315_145007_132"
      And there should be an image "dsc20050727_091048_222"
      And there should be an image "dsc20050813_115856_52"
      And I should see "Seed pods on stem"
      And I should see "Golden Gate Bridge"
      And there should be an image "dsc20050604_133440_3421"
      And there should be a link "/post-format-gallery/2/"
    Given I open "/post-format-gallery/100_5540/"
     Then I should see "Golden Gate Bridge"
      And there should be an image "Golden Gate Bridge"

  Scenario: Post Format: Link
    Given I open "/post-format-link/"
     Then there should be a link "http://wpdaily.co/mural/"

  Scenario: Post Format: Image
    Given I open "/post-format-image-caption/"
     Then I should see a "img[alt='Triforce Wallpaper']" element
      And I should see "dangerous to go alone"
    Given I open "/post-format-image/"
     Then I should see a "img[alt='Unicorn Wallpaper']" element
      And I should see "love this wallpaper"

  Scenario: Post Format: Video
    Given I open "/post-format-video/"
     Then I should see a "iframe[src='http://www.youtube.com/embed/nwe-H6l4beM?feature=oembed']" element
      And I should see "The official music video"

  Scenario: Categories
    Given I open "/category/uncategorized/"
     Then I should see "This post has many tags."
      And I should see "This post has many categories."
    Given I open "/category/titles/"
     Then I should see "Posts in this category test post title scenarios."

  Scenario: Archives
    Given I open "/2012/12/"
     Then I should see "Post Format"
      And I should see "Inspiration is a spark"
      And I should see "Post Format: Chat"

  Scenario: Page Comments
    Given I open "/page-comments/"
     Then I should see "Page Comments"
      And I should see "post has its comments"
      And I should see "comment with an English accent"
      And there should be a link "http://chrisam.es/"

 Scenario: Page nesting
   Given I open "/parent-page/"
    Then I should see "This page the a parent page."
   Given I open "/parent-page/child-page-01/"
    Then I should see "This is a child page."
     And there should be a link "/parent-page/"
   Given I open "/parent-page/child-page-03/grandchild-page/"
    Then I should see "This is a grandchild page."
     And there should be a link "/parent-page/"
     And there should be a link "/parent-page/child-page-03/"