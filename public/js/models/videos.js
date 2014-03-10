define('models/videos', ['backbone','models/video'], function (Backbone, Video) {
  return Backbone.Collection.extend({
    initialize: function(models) {
      var that = this;
    },
    comparator: function(model) {
      return model.get("index");
    },
    model: Video
  });
});
