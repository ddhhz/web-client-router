
var Router = require('..');

var handler = function(data) {
  console.log(data);
  var el = document.getElementById('route')
  el.textContent = data.url;
};

var router = new Router([
  {
    path: '/',
    title: 'Root Page',
    handler: handler,
    pre: function(route, next) {
      return next(null, 'some result');
    },
    get: ['/']
  },

  {
    path: '/abc',
    title: 'Abc Page',
    handler: handler,
    pre: [
      function auth(route, next) {
        console.log('Route:', route);
        return next();
      },
      function(route, next) {
        console.log('Route:', route);
        return next(null);
      }
    ]
  },

  {
    path: '/abc/super',
    title: 'Abc/Super Page',
    handler: handler
  },

  {
    path: '/abc/:a/:b',
    title: 'Abc/Super/a/b Page',
    handler: handler,
    get: ['/{a}']
  },

  // Catch all 404 handler
  {
    path: '/*',
    handler: handler
  },

], {

  xhr: {
    headers: {
      'Content-Tyoe': 'application/json'
    }
  }
  // silent: true
});

// router.addRoute({
//   path:
// });

// Testing events
router.events.on('route_complete', function() {
  console.log('route_complete');
});

router.events.on('route_matched', function(url) {
  console.log('route_matched');
});

router.events.on('route_error', function() {
  console.log('route_error');
});

router.events.on('route_not_found', function() {
  console.log('route_not_found');
});

window.r = router;