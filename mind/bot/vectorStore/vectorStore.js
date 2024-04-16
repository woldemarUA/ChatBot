import { OpenAIEmbeddings } from '@langchain/openai';
import { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';

import client from '../elastic/elasticClient.js';
/**
 * Fonction pour créer et configurer le magasin de vecteurs. Cette fonction est conçue pour utiliser Elasticsearch comme backend et configure spécifiquement un index dans Elasticsearch pour stocker les embeddings vectoriels générés par les modèles d'OpenAI.
 * @param {string} indexName - Le nom de l'index Elasticsearch à créer ou à utiliser.
 * @returns {object} Le magasin de vecteurs configuré.
 * await vectorStore.delete({ ids });
 * await vectorStore.addDocuments(docs)
 * Gestion des erreurs : La fonction contient désormais un bloc try-catch, améliorant sa robustesse en gérant les exceptions de manière plus efficace.
 */

async function createVectorStore(indexName) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await client.cat.indices({ format: 'json' });
    const indices = response.map((index) => index.index);
    if (!indices.includes(indexName))
      await client.indices.create({
        index: indexName,
      });
    const clientArgs = {
      client,
      indexName,
    };

    const embeddings = new OpenAIEmbeddings({
      apiKey: OPENAI_API_KEY,
    });
    const vectorStore = new ElasticVectorSearch(embeddings, clientArgs);

    return vectorStore;
  } catch (err) {
    console.error('An error occurred while creating the vector store:', err);
    throw err;
  }
}

export default createVectorStore;
