require.config({
  paths: {
    jquery: 'lib/jquery', 
    jqueryUI: 'lib/jquery-ui-1.10.3.custom',
    lodash: 'lib/lodash-2.1.0',
    backbone: 'lib/backbone',
    marionette: 'lib/backbone.marionette'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    lodash: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['jquery', 'lodash', 'backbone'],
      exports: 'Marionette'
    }
  }
});

require(
  [
    'jquery', 'lodash', 'backbone', 'marionette', 'vent',
    'models/search_results', 'models/search_results_view',
    'models/selectors', 'models/selectors_view',
    'models/images', 'models/images_view',
    'models/videos', 'models/videos_view',
    'models/links', 'models/links_view',
    'models/shows', 'models/shows_view',
    'models/artist_info', 'models/artist_info_view'
  ], 
  function (
    $, _, Backbone, Marionette, vent,
    SearchResults, SearchResultsView,
    Selectors, SelectorsView,
    Images, ImagesView,
    Videos, VideosView,
    Links, LinksView,
    Shows, ShowsView,
    ArtistInfo, ArtistInfoView
  ) {

  // initialize our Marionette app
  var app = new Marionette.Application(),
      cur_artist_id = 0,
      // models, collections, views, layouts:
      contentLayout, ContentLayout,
      searchResults, searchResultsView,
      selectors, selectorsView,
      images, imagesView,
      videos, videosView,
      links, linksView,
      shows, showsView,
      artistInfoView
      ;

  // initialize our OA sdk interface
  OA.initialize({
    stream_key: "brian-test",
    info_key: "brian-test"
  });

  // Our main region for displaying content/search-results
  app.addRegions({
    content: '#content-container'
  });

  app.addInitializer(function() {
    // Setup our search results collection on app init
    searchResults = new SearchResults();
    searchResultsView = new SearchResultsView({
      collection: searchResults
    });

    // Setup our layout that we'll use after an artist is selected
    ContentLayout = Marionette.Layout.extend({
      className: 'content_layout',
      regions: {
        selectors: '#selectors',
        particles: '#particles'
      },
      render: function() {
        var template = _.template($('#temp-layout').html(), {});
        this.$el.html( template );
      },
    });

    contentLayout = new ContentLayout();

    // Setup our search results collection on app init
    selectors = new Selectors();
    selectorsView = new SelectorsView({
      collection: selectors
    });
    selectors.add({name: 'Info', index: 0});
    selectors.add({name: 'Images', index: 1});
    selectors.add({name: 'Media', index: 2});
    selectors.add({name: 'Links', index: 3});
    //selectors.add({name: 'Austin Shows', index: 4});
  });

  // Search inputs:
  $('.glyphicon').on('click', function() {
    vent.trigger('artist:search', $('#search_input').val());
  });
  $('#search_input').keypress(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $('.glyphicon').click();
    }
  });

  // ARTIST SEARCH
  vent.on('artist:search', function(req) {
    searchResults.reset();
    app.content.show(searchResultsView);

    $.ajax({
      type: 'GET',
      url: 'http://api.openaura.com/v1/search/artists',
      data: {q: req, limit: 100, api_key:"brian-test"},
      success: function(data, textStatus) {
        if (textStatus == 'success') {
          data.forEach(function(d,i) {
            searchResults.add(_.extend(d,{index:i}));
          });
          searchResultsView.render();
        }
      }
    });
  });

  // ARTIST SELECTED
  vent.on('artist:selected', function(artist_id) {
    // set the current artist id
    cur_artist_id = artist_id;
    // switch out our main region to show selectors and artist content
    contentLayout = new ContentLayout();
    app.content.show(contentLayout);
    contentLayout.selectors.show(selectorsView);
  });

  // SELECTOR - INFO
  vent.on('selector:info', function() {
    var aidata = {};
    OA.ArtistInfo.fetchByOaArtistId(cur_artist_id, function(ai) {
      aidata.bio = ai.bio();
      aidata.styles = ai.styleTags().media[0].data.tags;
      aidata.profile_image_src = ai.profilePhoto().last().url();
      artistInfoView = new ArtistInfoView({
        model: new ArtistInfo(aidata)
      });
      contentLayout.particles.show(artistInfoView);
    });
   
  });

  // SELECTOR - IMAGES
  vent.on('selector:images', function() {
    var image_url = '';

    images = new Images();
    imagesView = new ImagesView({
      collection: images
    });
    contentLayout.particles.show(imagesView);

    OA.Aura.fetchByOaArtistId(cur_artist_id, function(aura) {
      aura
        .particles()
        .withMediaWithin(200,200,1000,2000)
        .filterByMedia(function(m) { return m.mediaType() == 'image'; })
        .each(function(p) {
          image_url = p.media().last().url(); 
          images.add({url: image_url});
      });
      imagesView.render();
    });
  });

  // SELECTOR - MEDIA
  vent.on('selector:media', function() {
    videos = new Videos();
    videosView = new VideosView({
      collection: videos
    });
    contentLayout.particles.show(videosView);

    OA.Aura.fetchByOaArtistId(cur_artist_id, function(aura) {
      aura
        .particles()
        .filterByMedia(function(m) { return m.mediaType() == 'embed' || m.mediaType() == 'video'; })
        .each(function(p) {
            if (_.has(data.resultsPage.results, 'event')) {
              data.resultsPage.results.event.forEach(function(event) {
                if (event.location.city == 'Austin, TX, US') {
                  showdata = {};
                  showdata.title = event.start.displayName;
                  showdata.date = event.start.date;
                  showdata.time = event.start.time;
                  showdata.datetime = event.start.datetime;

                  shows.add(showdata);
                }
              });
            }
            showsView.render();
          });
        }
      }
    });
  });

  // start our marionette app
  app.start();
});
