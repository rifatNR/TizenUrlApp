var url_input = document.querySelector(".url_input");
window.onload = function() {
	var frame = document.querySelector("#main_frame");
	var body = document.querySelector("#main_body");
	
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {


    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		// hideInputDiv();
    		break;
    	case 38: //UP arrow
    		// frame.contentWindow.focus();
    		break;
    	case 39: //RIGHT arrow
			toggleInputDiv()
    		break;
    	case 40: //DOWN arrow
    		// frame.contentWindow.focus();
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
    		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}

document.onkeypress=function(e){
	console.log(e.key);
	if(e.key === "Enter") {
		// showInputDiv()
	}
}
showInputDiv()


function onSubmit(event) {
	event.preventDefault()
}
function goToURL() {
	var url = document.querySelector("#url").value;
	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }

	saveUrl(url);
}

function renderIFrame(url) {
	var frame = document.querySelector("#main_frame");
	frame.src = url;
	console.log(frame);
	//frame.contentWindow.location.reload();
	hideInputDiv()
	setTimeout(checkNetwork, 5000);
}

function saveUrl(url) {
	localStorage.setItem('last_url', url)
	// alert(localStorage.getItem('last_url'));
	getSavedUrl()
}
function getSavedUrl() {
	if(localStorage.getItem('last_url') == null) {
		default_url = 'https://api.ips.procon.cloud/play?id=76'
        document.querySelector('#url').value = ''
		renderIFrame(default_url)
    } else {
		last_url = localStorage.getItem('last_url')
		console.log(last_url);
		document.querySelector('#url').value = last_url
		renderIFrame(last_url)
    }
}
getSavedUrl()





function toggleInputDiv() {
	var input_div = document.querySelector('.input_div')
	if(input_div.classList.contains('show')) {
		hideInputDiv()
	} else {
		showInputDiv()
	}
}
function showInputDiv() {
	var input_div = document.querySelector('.input_div')
	input_div.classList.add('show')
	// var down_arrow_div = document.querySelector('.down_arrow_div')
	// down_arrow_div.classList.remove('show')

	document.querySelector('#url').focus()
}
function hideInputDiv() {
	var input_div = document.querySelector('.input_div')
	input_div.classList.remove('show')
	// var down_arrow_div = document.querySelector('.down_arrow_div')
	// down_arrow_div.classList.add('show')

	document.querySelector('#url').blur()
}


setInterval(checkNetwork, 3000);

var network_status = 'online';
function checkNetwork(){
	// var isConnected = window.navigator.onLine;

	var url = "https://jsonplaceholder.typicode.com/posts/1"

	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		data: {},
		success: function (data, textStatus, xhr) {
			console.log(xhr.status);
			console.log('Connection available');
			if(network_status != 'online') {
				getSavedUrl()
				document.querySelector('.wrapper').classList.add('dsp_none')
				network_status = 'online';
				console.log('online page loaded');
			}
		},
		error: function (xhr, textStatus) {
			console.log(xhr.status);
			console.log('Connection not available');
			if(network_status != 'offline') {
				// var frame = document.querySelector("#main_frame");
				// frame.src = 'no_internet.html';
				document.querySelector('.wrapper').classList.remove('dsp_none')
				network_status = 'offline';
				console.log('Offline page loaded');
			}
		}
	});
}