define('models/images', ['backbone','models/image'], function (Backbone, Image) {
  return Backbone.Collection.extend({
    initialize: function(models) {
      var that = this;
    },
    comparator: function(model) {
      return model.get("index");
    },
    model: Image
  });
});
