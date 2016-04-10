<div class="row">
	<div class="col-sm-2 col-xs-12 settings-header">Plugin Settings</div>
	<div class="col-sm-10 col-xs-12">	
		<form role="form" class="topic-tags-settings">
		    <div class="form-group">
				<label for="ignoredWords">Ignored Words (<code>,</code> separated)</label>
				<textarea id="ignoredWords" type="text" class="form-control" name="ignoredWords">
				</textarea>
			</div>
		</form>
	</div>
</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
    <i class="material-icons">save</i>
</button>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('topic-tags', $('.topic-tags-settings'));
	
		$('#save').on('click', function() {
			Settings.save('topic-tags', $('.topic-tags-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'topic-tags-saved',
					title: 'Settings Saved',
					message: 'Click here to reload NodeBB',
					timeout: 2500,
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>