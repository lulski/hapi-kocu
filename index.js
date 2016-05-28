'use strict';
const Path = require('path');
const Hapi = require('hapi');

const server = new Hapi.Server({
  // connections: {
  //   routes: {
  //     files: {
  //       relativeTo: Path.join(__dirname, 'public')
  //     }
  //   }
  // }
});

server.connection({ port: 3000 });
/*
server.route({
method: 'GET',
path: '/',
handler: function (request, reply) {
reply('Hello, world!');
}
});

server.route({
method: 'GET',
path: '/{name}',
handler: function (request, reply) {
reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
}
});
*/
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});


server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }


  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./html/hello2.html');
    }
  });

    /*
  server.route({
    method: 'GET',
    path: '/img/photo.jpg',
    handler: function (request, reply) {
      reply.file('public/img/photo.jpg');
    }
  });
  */

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public/',
        listing: true
      }
    }
  });


});
