define('models/links', ['backbone','models/link'], function (Backbone, Link) {
  return Backbone.Collection.extend({
    initialize: function(models) {
      var that = this;
    },
    comparator: function(model) {
      return model.get("provider_id");
    },
    model: Link
  });
});
