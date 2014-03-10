define('models/link_view', ['marionette', 'vent'], function(Marionette, vent) {
  return Marionette.ItemView.extend({
    initialize: function() {
      var that = this;
      that.render();
    },
    events: {
      'click' : 'select'
    },
    tagName: 'div',
    className: 'link',
    render: function() {
      var template = _.template($('#temp-link').html(), this.model.attributes);
      this.$el.html( template );
    },
    select: function() {
    }
  });
});
