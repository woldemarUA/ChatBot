import express, { query } from 'express';

const router = express.Router();
import elasticClient from '../bot/elastic/elasticClient.js';

// ****************documents

// list documents in the index

router.get('/documents/:indexName', async (req, res) => {
  try {
    const indexName = req.params.indexName;
    const response = await elasticClient.search({
      index: indexName,
      body: {
        query: {
          match_all: {}, // gets all docs
        },
      },
    });

    let documents = response.hits.hits.map((hit) => hit._id);

    res.status(200).json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, msg: err.message });
  }
});

// delete document in the index

router.delete('/document/:indexName/:docId', async (req, res) => {
  try {
    const { indexName, docId } = req.params;

    await elasticClient.delete({
      index: indexName,
      id: docId,
    });

    res.status(200).json(`Document ${docId} deleted from index ${indexName}`);
  } catch (err) {
    console.error(err);
    res.status(500).json('Error deleting document');
  }
});

// ****************indices******************

// list all indices

router.get('/indices', async (req, res) => {
  try {
    const response = await elasticClient.cat.indices({ format: 'json' });
    const indicesList = response.map((index) => index.index);

    res.status(200).json(indicesList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, msg: err.message });
  }
});

// create index

router.post('/indices/:indexName', async (req, res) => {
  try {
    const indexName = req.params.indexName;
    const response = await elasticClient.indices.create({
      index: indexName,
    });
    res.status(200).json(`Index ${indexName} was successfully created`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, msg: err.message });
  }
});

// delete index

router.delete('/indices/:indexName', async (req, res) => {
  try {
    const indexName = req.params.indexName;
    await elasticClient.indices.delete({
      index: indexName,
    });
    res.status(200).json(`Index ${indexName} was deleted successfully `);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, msg: err.message });
  }
});

export default router;

// // Adding or updating a document
// app.put('/document/:indexName/:docId', async (req, res) => {
//   try {
//     const { indexName, docId } = req.params;
//     const documentData = req.body; // Assume JSON document is sent in the request body

//     const { body } = await elasticClient.index({
//       index: indexName,
//       id: docId, // Optional for add. Required for update.
//       body: documentData,
//       refresh: true, // Makes the document available for search immediately
//     });

//     res.status(200).json(`Document ${docId} added/updated in index ${indexName}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json('Error adding/updating document');
//   }
// });
