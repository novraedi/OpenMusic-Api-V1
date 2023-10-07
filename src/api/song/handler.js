const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async PostSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async GetSongsHandler(request) {
    const { title, performer } = request.query;
    const songs = await this._service.getAllSongs(title, performer);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async GetSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    const response = h.response({
      status: 'success',
      data: {
        song,
      },
    });
    response.code(200);
    return response;
  }

  async PutSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    await this._service.updateSongById(id, request.payload);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  async DeleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'Berhasil menghapus lagu',
    };
  }
}

module.exports = SongsHandler;
