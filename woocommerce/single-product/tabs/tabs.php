<?php
/**
 * Single Product tabs
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Filter tabs and allow third parties to add their own
 *
 * Each tab is an array containing title, callback and priority.
 * @see woocommerce_default_product_tabs()
 */
$tabs = apply_filters( 'woocommerce_product_tabs', array() );

if ( ! empty( $tabs ) ) : ?>

	<div class="pixcode  pixcode--tabs">
		<ul class="pixcode--tabs__nav  tabs__nav  nav  nav-tabs  product__tabs">

			<?php
                $first = true;
                foreach ( $tabs as $key => $tab ) :
                    if ($first) {
                        $classname = " current";
                        $first = false;
                    } else {
                        $classname = "";
                    }
            ?>

				<li>
					<a class="<?php echo $key . "_tab" . $classname ?>" data-toggle="tab" href="#tab-<?php echo $key ?>"><?php echo apply_filters( 'woocommerce_product_' . $key . '_tab_title', $tab['title'], $key ) ?></a>
				</li>

			<?php endforeach; ?>

		</ul>
        <div class="pixcode--tabs__content  tabs__content">
            <?php
                $first = true;
                foreach ( $tabs as $key => $tab ) :
                    if ($first) {
                        $classname = "";
                        $first = false;
                    } else {
                        $classname = " hide";
                    }
            ?>

                <div class="tabs__pane <?php echo $classname ?>" id="tab-<?php echo $key ?>">
                    <?php call_user_func( $tab['callback'], $key, $tab ) ?>
                </div>

            <?php endforeach; ?>
        </div>
	</div>

<?php endif; ?>