"use strict";

const File = use("App/Models/File");

const Helpers = use("Helpers");

class FileController {
  /**
   * Create/save a new file.
   * POST files
   */
  async store({ request, response }) {
    try {
      if (!request.file("file")) return;

      const upload = request.file("file", { size: "20mb" });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath("uploads"), {
        name: fileName
      });
      console.log("Antes do moved");
      //NÃO MOVEU
      if (!upload.moved()) {
        throw upload.error();
      }
      console.log("Depois do moved");

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });
      console.log("passou aqui2");
      return file;
    } catch (err) {
      console.log("Entrou no error");
      console.log(err);
      return response.status(500).send(err);
    }
  }

  async show({ params, response }) {
    const file = await File.findOrFail(params.id);
    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }
}

module.exports = FileController;
