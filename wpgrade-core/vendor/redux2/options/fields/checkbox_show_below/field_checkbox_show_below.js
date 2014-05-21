jQuery(document).ready(function(){
	jQuery('.redux-opts-checkbox-show-below').each(function(){
		var amount = jQuery(this).data('amount');
		if(jQuery(this).is(':checked')){
			jQuery(this).closest('tr').nextAll('tr').slice(0,amount).hide();
		} else {
			jQuery(this).closest('tr').nextAll('tr').slice(0,amount).show();
		}
	});
	jQuery('.redux-opts-checkbox-show-below').click(function(){
		var amount = jQuery(this).data('amount');
		//jQuery(this).closest('tr').nextAll('tr').slice(0,amount).fadeToggle('slow');
		if(jQuery(this).is(':checked')){
			jQuery(this).closest('tr').nextAll('tr').slice(0,amount).fadeOut('slow');
		} else {
			jQuery(this).closest('tr').nextAll('tr').slice(0,amount).fadeIn('slow');
			jQuery('.redux-opts-checkbox-show-below').each(function(){
				var amount = jQuery(this).data('amount');
				if(jQuery(this).is(':checked')){
					jQuery(this).closest('tr').nextAll('tr').slice(0,amount).hide();
				} else {
					jQuery(this).closest('tr').nextAll('tr').slice(0,amount).show();
				}
			});
		}
	});
});