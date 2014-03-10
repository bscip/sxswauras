define('models/selector_view', ['marionette', 'vent'], function(Marionette, vent) {
  return Marionette.ItemView.extend({
    initialize: function() {
      var that = this;
      that.render();
    },
    events: {
      'click' : 'select'
    },
    tagName: 'div',
    className: 'selector btn btn-primary',
    render: function() {
      var template = _.template($('#temp-selector').html(), this.model.attributes);
      this.$el.html( template );
    },
    select: function() {
      var selected = this.model.attributes.name;
      if (selected == 'Info') {
        vent.trigger('selector:info');
      } else if (selected == 'Images') {
        vent.trigger('selector:images');
      } else if (selected == 'Media') {
        vent.trigger('selector:media');
      } else if (selected == 'Austin Shows') {
        vent.trigger('selector:shows');
      } else if (selected == 'Links') {
        vent.trigger('selector:links');
      }
    }
  });
});
