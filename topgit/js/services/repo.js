tgApp.service('Repos', function ($http, $q) {

    var _meta = {
            rateLimit: 0,
            rateLimitRemaining: 0
        },
        _link = {
            prev: '',
            next: ''
        },
        _data = {
            items: [],
            totalCount: 0
        },
        _starsSlider = {},
        _hasMore = false;


    this._setStarsCount = function () {
        var min = Math.min.apply(Math, _data.items.map(function (item) {
            return item.stargazers_count;
        }));
        var max = Math.max.apply(Math, _data.items.map(function (item) {
            return item.stargazers_count;
        }));
        _starsSlider = {
            value: min,
            options: {
                floor: min,
                ceil: max
            }
        };
    }


    this.fetchRepos = function (url) {

        var self = this;
        var deferred = $q.defer();
        $http({
            method: 'JSONP',
            url: url,
            cache: true
        }).success(function(response) {
            deferred.resolve(response);

            //For inifinite scrolling
            //if (_data.items == null) {
            //    _data.items = response.data.items;
            //} else {
            //    _data.items.push.apply(_data.items, response.data.items);
            //}

            //For pagination
            _data.items = response.data.items;

            self._setStarsCount();

            if (response.hasOwnProperty('meta')) {

                _meta.rateLimit = response.meta['X-RateLimit-Limit'];
                _meta.rateLimitRemaining = response.meta['X-RateLimit-Remaining'];

                var link     = response.meta['Link'],
                    nextPage = link[0],
                    prevPage = null;

                nextPage = nextPage[0].split(",");

                if (nextPage[0] !== undefined) {
                    _link.next = nextPage[0].replace(/angular.callbacks._[0-9]/, 'JSON_CALLBACK');
                    _hasMore = true;
                }

                console.log("link 3: "+link[3]);
                if(link[3] !== undefined){
                    prevPage = link[3];
                    console.log("prevPage: "+prevPage);
                    prevPage = prevPage[0].split(",");
                    console.log("prevPage: "+prevPage);
                    if (prevPage[0] !== undefined) {
                        _link.prev = prevPage[0].replace(/angular.callbacks._[0-9]/, 'JSON_CALLBACK');
                        _hasMore = true;
                    }
                }
            }

            _data.totalCount = response.data.total_count;

            NProgress.done();
            //return _data;
        }).error(function () {
            deferred.reject('Error fetching data from GitHub!');
        });
        return deferred.promise;
    }

    this.getRepo = function () {

        return {
            meta:       _meta,
            link:       _link,
            data:       _data,
            slider:     _starsSlider,
            hasMore:   _hasMore
        }
    }

});
