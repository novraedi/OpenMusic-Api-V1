const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.PostAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.GetAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.PutAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.DeleteAlbumByIdHandler,
  },
];

module.exports = routes;
