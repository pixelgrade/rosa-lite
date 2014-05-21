<form class="form-search" method="get" action="<?php echo home_url( '/' ); ?>" role="search">
    <input class="search-query" type="text" name="s" id="s" placeholder="<?php _e('Search...', wpgrade::textdomain()) ?>" autocomplete="off" value="<?php the_search_query(); ?>" /><!--
    --><button class="btn search-submit" id="searchsubmit"><i class="icon-search"></i></button>
</form>