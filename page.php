<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 *
 */

get_header();

global $wpgrade_private_post;

if ( post_password_required() && !$wpgrade_private_post['allowed'] ) {
	// password protection
    get_template_part('templates/password-request-form');

} else { ?>

    <section class="content  content--single-page">
        <article class="article--page  article--main">
            <header class="article__header">
                <?php if (has_post_thumbnail()):
                    $image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full-size');
                    if (!empty($image[0])): ?>
                        <img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
                    <?php endif;
                endif;?>
                <div class="flexbox">
                    <div class="flexbox__item">
                        <hgroup class="article__headline">
                            <h1 class="headline__primary"><?php the_title(); ?></h1>
                        </hgroup>
                    </div>
                </div>
            </header>
            <section class="article__content">
                <div class="container">
                    <section class="page__content  js-post-gallery  cf">
                        <?php the_content(); ?>
                    </section>
                    <?php
                    global $numpages;
                    if($numpages > 1):
                        ?>
                        <div class="entry__meta-box  meta-box--pagination">
                            <span class="meta-box__title"><?php _e('Pages', wpgrade::textdomain()) ?></span>
                            <?php
                            $args = array(
                                'before' => '<ol class="nav  pagination--single">',
                                'after' => '</ol>',
                                'next_or_number' => 'next_and_number',
                                'previouspagelink' => __('&laquo;', wpgrade::textdomain()),
                                'nextpagelink' => __('&raquo;', wpgrade::textdomain())
                            );
                            wp_link_pages( $args );
                            ?>
                        </div>
                    <?php endif; ?>
                </div>
            </section>
                <?php
                    //comments
                    if ( comments_open() || '0' != get_comments_number() ): ?>
                    <div class="container">
                        <?php comments_template(); ?>
                    </div>
                <?php endif; ?>
        </article>
    </section>

<?php } // close if password protection

get_footer();
