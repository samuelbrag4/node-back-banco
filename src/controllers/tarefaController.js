import tarefaModel from "../models/tarefaModel.js";
class TarefaController {
  getAll = async (req, res) => {
    try {
      const tarefas = await tarefaModel.getAll();
      res.json(tarefas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar as tarefas" });
    }
  };

  create = async (req, res) => {
    const { descricao } = req.body;
    try {
      if (!descricao) {
        return res.status(400).json({ erro: "Descrição é obrigatória" });
      }
      const novaTarefa = await tarefaModel.create(descricao);
      res.status(201).json(novaTarefa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao criar a tarefa" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { concluida, descricao } = req.body;

    try {
      const tarefaAtualizada = await tarefaModel.update(Number(id), concluida, descricao);

      if(!tarefaAtualizada) {
        return res.status(404).json({ erro: "Não achei a tarefa não man..." });
      } 

      res.json(tarefaAtualizada)

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Filhote, não deu pra atualizar." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const sucesso = await tarefaModel.delete(Number(id));

      if (!sucesso) {
        return res.status(404).json({ erro: "A tarefa vacilou com você" });
      }

      res.status(200).send({ message: "A tarefa foi pro vasco!!!"});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "CHORA FI, CHORA MSM PQ A TAREFA N FOI EXCLUIDA" });
    }
  };
}

export default new TarefaController();
