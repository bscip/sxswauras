define('models/shows', ['backbone','models/shows'], function (Backbone, Show) {
  return Backbone.Collection.extend({
    initialize: function(models) {
      var that = this;
    },
    comparator: function(model) {
      return model.get("index");
    },
    model: Show
  });
});
