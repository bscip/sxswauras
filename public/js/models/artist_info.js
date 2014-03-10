define('models/artist_info', ['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    initialize: function() {
      var that = this,
          styles_html = '<div id="style_tags">';

      that.attributes.styles.forEach(function(st) {
        styles_html += '<div class="style_tag">'+st+'</div>';
      });
      styles_html += '</div>';
      that.set('styles_html', styles_html);
      that.set('bio', that.attributes.bio.split('\n').join('<br/><br/>'));
    }
  });
});
