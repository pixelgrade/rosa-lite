<?php
/**
 * The template for displaying Comments.
 * The area of the page that contains both current comments
 * and the comment form. The actual display of comments is
 * handled by a callback to rosa_comment() which is
 * located in the functions.php file.
 * @package wpGrade
 * @since   wpGrade 1.0
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
} ?>

	<div id="comments" class="comments-area  <?php if ( ! have_comments() ) { echo 'no-comments'; } ?>">
		<div class="comments-area-title">
			<h3 class="comments-title">
				<?php
				if ( have_comments() ) :
					printf(
						_n(
							'<span class="comment-number total">1</span> Comment',
							'<span class="comment-number total">%1$s</span>Comments',
							get_comments_number(),
							'rosa'
						),
						number_format_i18n( get_comments_number() )
					);
				else:
					_e( '<span class="comment-number total">+</span> There are no comments', 'rosa' );
				endif;
				?>
			</h3>
			<?php echo '<a class="comments_add-comment" href="#reply-title">' . __( 'Add yours', 'rosa' ) . '</a>'; ?>
		</div>
		<?php
		// You can start editing here -- including this comment!
		if ( have_comments() ) :
			if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
				<nav role="navigation" id="comment-nav-above" class="site-navigation comment-navigation">
					<h3 class="assistive-text"><?php _e( 'Comment navigation', 'rosa' ); ?></h3>

					<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'rosa' ) ); ?></div>
					<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'rosa' ) ); ?></div>
				</nav><!-- #comment-nav-before .site-navigation .comment-navigation -->
			<?php endif; // check for comment navigation ?>

			<ol class="commentlist">
				<?php
				/* Loop through and list the comments. Tell wp_list_comments()
				 * to use rosa_comment() to format the comments.
				 * If you want to overload this in a child theme then you can
				 * define rosa_comment() and that will be used instead.
				 * See rosa_comment() in inc/template-tags.php for more.
				 */
				wp_list_comments( array( 'callback' => 'rosa_comments', 'short_ping' => true ) ); ?>
			</ol><!-- .commentlist -->

			<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
				<nav role="navigation" id="comment-nav-below" class="site-navigation comment-navigation">
					<h3 class="assistive-text"><?php _e( 'Comment navigation', 'rosa' ); ?></h3>

					<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'rosa' ) ); ?></div>
					<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'rosa' ) ); ?></div>
				</nav><!-- #comment-nav-below .site-navigation .comment-navigation -->
			<?php endif; // check for comment navigation ?>


		<?php endif; // have_comments() ?>

	</div><!-- #comments .comments-area -->
<?php
// If comments are closed and there are comments, let's leave a little note, shall we?
if ( ! comments_open() && post_type_supports( get_post_type(), 'comments' ) && ! is_page() ) :
	?>
	<p class="nocomments"><?php _e( 'Comments are closed.', 'rosa' ); ?></p>
<?php endif;

$commenter = wp_get_current_commenter();
$req       = get_option( 'require_name_email' );
$aria_req  = ( $req ? " aria-required='true'" : '' );

if ( is_user_logged_in() ) {
	$current_user  = wp_get_current_user();
	$comments_args = array(
		// change the title of send button=
		'title_reply'          => __( '<span class="comment-number total">+</span> Leave a Comment', 'rosa' ),
		// remove "Text or HTML to be displayed after the set of comment fields"
		'comment_notes_before' => '',
		'comment_notes_after'  => '',
		'fields'               => apply_filters( 'comment_form_default_fields', array(
			'author' => '<p class="comment-form-author"><label for="author" class="show-on-ie8">' . __( 'Name', 'rosa' ) . '</label><input id="author" name="author" value="' . esc_attr( $commenter['comment_author'] ) . '" type="text" placeholder="' . __( 'Name', 'rosa' ) . '..." size="30" ' . $aria_req . ' /></p>',
			'email'  => '<p class="comment-form-email"><label for="email" class="show-on-ie8">' . __( 'Email', 'rosa' ) . '</label><input id="email" name="email" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" type="text" placeholder="' . __( 'your@email.com', 'rosa' ) . '..." ' . $aria_req . ' /></p>'
		) ),
		'id_submit'            => 'comment-submit',
		'label_submit'         => __( 'Submit', 'rosa' ),
		// redefine your own textarea (the comment body)
		'comment_field'        => '<p class="comment-form-comment"><label for="comment" class="show-on-ie8">' . __( 'Comment', 'rosa' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" placeholder="' . __( 'Your thoughts..', 'rosa' ) . '"></textarea></p>'
	);
} else {
	$comments_args = array(
		// change the title of send button
		'title_reply'          => __( '<span class="comment-number total">+</span> Leave a Comment', 'rosa' ),
		// remove "Text or HTML to be displayed after the set of comment fields"
		'comment_notes_before' => '',
		'comment_notes_after'  => '',
		'fields'               => apply_filters( 'comment_form_default_fields', array(
			'author' => '<p class="comment-form-author"><label for="author" class="show-on-ie8">' . __( 'Name', 'rosa' ) . '</label><input id="author" name="author" value="' . esc_attr( $commenter['comment_author'] ) . '" type="text" placeholder="' . __( 'Name', 'rosa' ) . '..." size="30" ' . $aria_req . ' /></p><!--',
			'email'  => '--><p class="comment-form-email"><label for="name" class="show-on-ie8">' . __( 'Email', 'rosa' ) . '</label><input id="email" name="email" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" type="text" placeholder="' . __( 'your@email.com', 'rosa' ) . '..." ' . $aria_req . ' /></p><!--',
			'url'    => '--><p class="comment-form-url"><label for="url" class="show-on-ie8">' . __( 'Url', 'rosa' ) . '</label><input id="url" name="url" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" placeholder="' . __( 'Website', 'rosa' ) . '..." type="text"></p>'
		) ),
		'id_submit'            => 'comment-submit',
		'label_submit'         => __( 'Submit', 'rosa' ),
		// redefine your own textarea (the comment body)
		'comment_field'        => '<p class="comment-form-comment"><label for="comment" class="show-on-ie8">' . __( 'Comment', 'rosa' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" placeholder="' . __( 'Your thoughts..', 'rosa' ) . '"></textarea></p>'
	);
}

//if we have no comments than we don't a second title, one is enough
if ( ! have_comments() ) {
	$comments_args['title_reply'] = '';
}

comment_form( $comments_args );