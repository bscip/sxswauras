define('models/video_view', ['marionette', 'vent'], function(Marionette, vent) {
  return Marionette.ItemView.extend({
    initialize: function() {
      var that = this;
      that.render();
    },
    attributes: function() {
      return {
        height: 328,
        width: 441,
        src: this.model.attributes.url
      };
    },
    tagName: 'iframe',
    className: 'video',
    render: function() {
      var template = _.template($('#temp-video').html(), this.model.attributes);
      this.$el.html( '<div class="video_container">'+template+'</div>' );
    }
  });
});
