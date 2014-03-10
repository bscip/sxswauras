define('models/selectors', ['backbone','models/selector'], function (Backbone, Selector) {
  return Backbone.Collection.extend({
    initialize: function(models) {
      var that = this;
    },
    comparator: function(model) {
      return model.get("index");
    },
    model: Selector
  });
});
