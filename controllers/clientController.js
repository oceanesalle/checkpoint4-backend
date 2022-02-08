import express from 'express';
import Client from '../models/clientModel.js';
import Joi from 'joi';
const router = express.Router(); 

const schemaClient = Joi.object({
  id: Joi.number().integer(),
  name:Joi.string().min(3).max(255).required(),
  clientcode: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
})

// racine client
router.get('/', async (req, res) => {
  try {
      const client = await Client.getAll(); 
      res.json(client);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const client = await Client.getOneById(id);
      client ? res.json(client) : res.status(404).json({ message: 'Client not found' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const result = await Client.deleteById(id);
      result ? res.json({message : `ClientId ${id} has been deleted !`}).status(204) : res.status(404).json({ message: 'Client not found' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

router.post('/', async (req, res) => {
  const client = { 
    name: req.body.name,
    clientcode : req.body.clientcode, 
    email : req.body.email,
  };

  try {
      const {error, value} = await schemaClient.validate(client)
      const lastInsertId = await Client.createNew(value);
      if (lastInsertId) {
          const newClient = await Client.getOneById(lastInsertId) 
          res.json(newClient);
      } else res.status(422).json({ message: error.message });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
})

router.put('/:id', async (req, res) => {
  const client = { 
    id : req.params.id, 
    name : req.body.name,
    clientcode : req.body.clientcode, 
    email : req.body.email,
  };

  try {
      const {error, value} = await schemaClient.validate(client)
      const clientUpdate = await Client.updateClient(value);
      if (clientUpdate) res.status(204);
      else res.status(422).json({ message: error.message });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
})

export default router;