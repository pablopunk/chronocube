

function ErrorHandle() {
	this.print = function(msg) {
		$('#console').html( $('#console').html() + '<br>' + msg )
		$('#console').show()
		setTimeout(function() { 
		   	$('#console').fadeOut(); 
		   	$('#console').text('')
		}, 5000); // 10 seconds
	}
}
