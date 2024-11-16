const { Disco, Artista, Genero } = require('../models');

// criação de um novo disco
exports.createDisco = async (req, res) => {
  try {
    const { titulo, ano_lancamento, capa, faixas, artistas, generos } = req.body;

    // criar um disco
    const disco = await Disco.create({
      titulo,
      ano_lancamento,
      capa,
      faixas,
    });

    if (artistas) {
      await disco.setArtistas(artistas);
    }

    if (generos) {
      await disco.setGeneros(generos); 
    }

    res.status(201).json(disco);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar disco', error });
  }
};

// lista
exports.getDiscos = async (req, res) => {
  try {
    const discos = await Disco.findAll({
      include: [Artista, Genero], 
    });
    res.status(200).json(discos);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar discos', error });
  }
};

// busca
exports.searchDisco = async (req, res) => {
  const { titulo } = req.query;
  try {
    const disco = await Disco.findOne({
      where: { titulo },
      include: [Artista, Genero],
    });

    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }

    res.status(200).json(disco);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar disco', error });
  }
};

// edição
exports.updateDisco = async (req, res) => {
  const { id } = req.params;
  const { titulo, ano_lancamento, capa, faixas, artistas, generos } = req.body;

  try {
    const disco = await Disco.findByPk(id);

    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }

    await disco.update({
      titulo,
      ano_lancamento,
      capa,
      faixas,
    });

    if (artistas) {
      await disco.setArtistas(artistas); 
    }

    if (generos) {
      await disco.setGeneros(generos);
    }

    res.status(200).json(disco);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar', error });
  }
};

// deletar
exports.deleteDisco = async (req, res) => {
  const { id } = req.params;

  try {
    const disco = await Disco.findByPk(id);

    if (!disco) {
      return res.status(404).json({ message: 'Disco não encontrado' });
    }

    await disco.destroy();
    res.status(200).json({ message: 'Disco deletado ' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar', error });
  }
};
