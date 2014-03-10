define('models/videos_view', ['marionette', 'models/video_view'], function (Marionette, VideoView) {
  return Marionette.CollectionView.extend({
    initialize: function(models) {
      var that = this;
    },
    appendHtml: function(collectionView, itemView, index){
      var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
      var children = childrenContainer.children();
      if (children.size() <= index) {
        childrenContainer.append(itemView.el);
      } else {
        children.eq(index).before(itemView.el);
      }
    },
    itemView: VideoView,
    className: 'videos'
  });
});
