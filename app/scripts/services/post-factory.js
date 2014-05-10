'use strict';

angular.module('luciandipeso.wl')
  .factory('PostFactory', [ '$http', '$q', 'settings', function($http, $q, settings) {
    var PostFactory = function() {
      this.items = [];
      this.currentPage = 0;
      this.stop = false;
      this.busy = false;
    };

    var Post = function(row) {
      this.id = row.id || 0;
      this.title = row.title || '';
      this.subtitle = row.subtitle || '';
      this.type = row.type || 'essay';
      this.dateAdded = row.dateAdded || new Date();
      this.dateUpdated = row.dateUpdated || new Date();
      this.lat = row.lat || null;
      this.lng = row.lng || null;
      this.latlng = (row.lat && row.lng) ? row.lat + ', ' + row.lng : null;

      var $postHtml = $('<div>' + (row.post || '') + '</div>');
      $postHtml.find('.article-sidenote')
        .wrapInner('<span class="contents"></span>')
        .prepend('<sub>↪</sub>');
      this.post = $postHtml.html();

      this.postlets = [];
      this.citations = [];

      this.map = false;
      this.mapObject = {
        marker: false
      };

      for(var i=0, length = row.postlets.length; i<length; i++) {
        this.postlets.push(new Postlet(row.postlets[i]));
      }

      for(i=0, length = row.citations.length; i<length; i++) {
        this.citations.push(new Citation(row.citations[i]));
      }

      this.showPostlet = function(idx) {
        if(this.map) {
          this.map.addMarker(idx);
        }

        for(var i=0, length = this.postlets.length; i<length; i++) {
          this.postlets[i].visible = false;
        }
        this.postlets[idx].visible = true;
      };
      
      if(this.postlets.length && this.postlets[0].hasCoords()) {
        this.map = {
          addMarker: function(idx) {
            if(this.mapObject.marker) {
              this.mapObject.marker.setMap(null);
              this.mapObject.marker = false;
            }

            var postlet = this.postlets[idx];
            var googleMap = this.mapObject.getGMap();

            if(!postlet || !postlet.hasCoords() || !googleMap) {
              return;
            }

            this.mapObject.marker = new google.maps.Marker({
              position: new google.maps.LatLng(postlet.lat, postlet.lng),
              map: googleMap,
              animation: google.maps.Animation.DROP
            });

            this.mapObject.refresh({
              latitude: postlet.lat,
              longitude: postlet.lng
            });
          }.bind(this),

          center: {
            latitude: this.postlets[0].lat,
            longitude: this.postlets[0].lng
          },
          zoom: 10, 
          postletLatLngs: [],
          postlets: [],
          stroke: {
            color: '#C23700',
            weight: 4,
            opacity: 0.8
          }
        }

        for(var i=0, length = this.postlets.length; i<length; i++) {
          if(this.postlets[i].hasCoords()) {
            this.map.postlets.push(this.postlets[i]);

            this.map.postletLatLngs.push({
              latitude: this.postlets[i].lat,
              longitude: this.postlets[i].lng
            });
          }
        }
      }
    }

    var Postlet = function(row) {
      this.id = row.id;
      this.dateAdded = row.dateAdded || new Date();
      this.lat = row.lat || null;
      this.lng = row.lng || null;
      this.post = row.post || '';
      this.visible = false;

      this.hasCoords = function() {
        return (this.lng && this.lat);
      };
    };

    var Citation = function(row) {
      this.id = row.id;
      this.citation = row.citation;
    };

    PostFactory.prototype.nextPage = function() {
      if(this.stop || this.busy) {
        return;
      }
      this.busy = true;
      var nextPage = this.currentPage + 1;
      this.getPosts(nextPage).then(function(results) {
        var i=0, length = results.length;
        if(!length) {
          // No more posts to grab
          this.stop = true;
          return;
        }
        for(; i<length; i++) {
          this.items.push(results[i]);
        }
        this.currentPage = nextPage;
        this.busy = false;
      }.bind(this));
    };

    PostFactory.prototype.getPost = function(id) {
      var url = URI(settings.apiBase + '/post/' + id);
      url.search({ 'callback': 'JSON_CALLBACK'});

      var deferred = $q.defer();
      $http.jsonp(url.toString())
        .success(function(data) {
          try{
            deferred.resolve(new Post(data.record));
          
          } catch(err) {
            deferred.reject('Fail to query server for posts. ' + err);
          }
        }.bind(this))
        .error(function(data, status, headers, config) {
          console.debug('Error', data, status, headers, config);
        });
      return deferred.promise;
    };

    PostFactory.prototype.getPosts = function(page) {
      var url = URI(settings.apiBase + '/posts/' + page);
      url.search({ 'callback': 'JSON_CALLBACK'});

      var deferred = $q.defer();
      $http.jsonp(url.toString())
        .success(function(data) {
          try{
            var i=0, length=data.records.length,
                results = [];
            for(; i<length; i++) {
              results.push(new Post(data.records[i]));
            }
            deferred.resolve(results);
          
          } catch(err) {
            deferred.reject('Fail to query server for posts. ' + err);
          }
        }.bind(this))
        .error(function(data, status, headers, config) {
          console.debug('Error', data, status, headers, config);
        });
      return deferred.promise;
    };

    return PostFactory;
  }]);