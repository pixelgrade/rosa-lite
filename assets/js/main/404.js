
/* --- 404 Page --- */
var gifImages = [
	"http://i.imgur.com/c9X6n.gif",
	"http://i.imgur.com/eezCO.gif",
	"http://i.imgur.com/DYO6X.gif",
	"http://i.imgur.com/9DWBx.gif",
	"http://i.imgur.com/8ZYNp.gif",
	"http://media1.giphy.com/media/vonLA9G2VvENG/giphy.gif",
	"http://media2.giphy.com/media/UslGBU1GPKc0g/giphy.gif",
	"http://media.giphy.com/media/LD0OalPb8u8Le/giphy.gif",

]

function getGif(){
	return gifImages[Math.floor(Math.random()*gifImages.length)];
}

function changeBackground(){
	$('.error404').css('background-image', 'url('+getGif()+')');
}


if($('.error404').length){
	changeBackground();
}

$(window).keydown(function(e){
	if(e.keyCode == 32){
		changeBackground();
	}
})
