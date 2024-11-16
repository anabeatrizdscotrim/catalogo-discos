const { Genero, Disco } = require('../models');

// criação genero
exports.createGenero = async (req, res) => {
  try {
    const { nome } = req.body;

    const genero = await Genero.create({
      nome,
    });

    res.status(201).json(genero);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar gênero', error });
  }
};

// listar
exports.getGeneros = async (req, res) => {
  try {
    const generos = await Genero.findAll({
      include: Disco,
    });
    res.status(200).json(generos);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar gêneros', error });
  }
};

// edição do genero
exports.updateGenero = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.status(404).json({ message: 'Gênero não encontrado' });
    }

    await genero.update({
      nome,
    });

    res.status(200).json(genero);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar gênero', error });
  }
};

// deletar
exports.deleteGenero = async (req, res) => {
  const { id } = req.params;

  try {
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.status(404).json({ message: 'Gênero não encontrado' });
    }

    await genero.destroy();
    res.status(200).json({ message: 'Gênero deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar gênero', error });
  }
};
