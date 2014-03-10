define('models/artist_info_view', ['marionette', 'vent'], function(Marionette, vent) {
  return Marionette.ItemView.extend({
    initialize: function() {
      var that = this;
      that.render();
    },
    events: {
      'click' : 'select'
    },
    tagName: 'div',
    className: 'artist_info',
    render: function() {
      var template = _.template($('#temp-artist_info').html(), this.model.attributes);
      this.$el.html( template );
    },
    select: function() {
    }
  });
});
