define('models/image_view', ['marionette', 'vent'], function(Marionette, vent) {
  return Marionette.ItemView.extend({
    initialize: function() {
      var that = this;
      that.render();
    },
    events: {
      'click' : 'select'
    },
    tagName: 'div',
    className: 'image',
    render: function() {
      var template = _.template($('#temp-image').html(), this.model.attributes);
      this.$el.html( template );
    },
    select: function() {
    }
  });
});
