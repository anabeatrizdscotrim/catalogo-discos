const { Artista, Disco } = require('../models');

// criação do artista
exports.createArtista = async (req, res) => {
  try {
    const { nome, genero_musical, discos } = req.body;

    // Criar
    const artista = await Artista.create({
      nome,
      genero_musical,
    });

    if (discos) {
      await artista.setDiscos(discos);
    }

    res.status(201).json(artista);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar artista', error });
  }
};

// listar
exports.getArtistas = async (req, res) => {
  try {
    const artistas = await Artista.findAll({
      include: Disco, 
    });
    res.status(200).json(artistas);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar artistas', error });
  }
};

// busca
exports.searchArtista = async (req, res) => {
  const { nome } = req.query;
  try {
    const artista = await Artista.findOne({
      where: { nome },
      include: Disco,
    });

    if (!artista) {
      return res.status(404).json({ message: 'Artista não encontrado' });
    }

    res.status(200).json(artista);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar artista', error });
  }
};

// edição
exports.updateArtista = async (req, res) => {
  const { id } = req.params;
  const { nome, genero_musical, discos } = req.body;

  try {
    const artista = await Artista.findByPk(id);

    if (!artista) {
      return res.status(404).json({ message: 'Artista não encontrado' });
    }

    await artista.update({
      nome,
      genero_musical,
    });

    if (discos) {
      await artista.setDiscos(discos);
    }

    res.status(200).json(artista);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar', error });
  }
};

// deletar
exports.deleteArtista = async (req, res) => {
  const { id } = req.params;

  try {
    const artista = await Artista.findByPk(id);

    if (!artista) {
      return res.status(404).json({ message: 'Não encontrado' });
    }

    await artista.destroy();
    res.status(200).json({ message: 'Artista deletado' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar', error });
  }
};
