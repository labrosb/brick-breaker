$(document).ready(function() {
	$("#musicList").change(function() {
		$("#musicPlayer").src = $("#musicList").val();
		$("#musicPlayer").play;
	});
});