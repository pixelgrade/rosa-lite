/* --- 404 Page --- */
gifImages = [
	"http://i.imgur.com/ShiZM6m.gif",
    "http://i.imgur.com/8ZYNp.gif",
    "http://i.imgur.com/Xb4fq.gif",
    "http://i.imgur.com/UYPLKwN.gif",
    "http://media.tumblr.com/d9e792a91d5391b8a7aa22689d4e2555/tumblr_inline_mwq1hmelce1qmoozl.gif",
    "http://www.teen.com/wp-content/uploads/2013/10/world-without-jennifer-lawrence-gifs-food-uproxx-2.gif"
]

function getGif() {
	return gifImages[Math.floor(Math.random() * gifImages.length)];
}

function changeBackground() {
	$('.error404').css('background-image', 'url(' + getGif() + ')');
}

$(window).on('load', function() {
    if ($('.error404').length) {
        changeBackground();
    }
});

$(window).keydown(function (e) {
	if (e.keyCode == 32) {
		changeBackground();
	}
})