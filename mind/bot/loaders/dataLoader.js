import { TextLoader } from 'langchain/document_loaders/fs/text';

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

/**
 * Charge et divise des documents textuels à partir d'un fichier spécifié, en utilisant un séparateur de texte personnalisé.
 * Cette fonction crée d'abord une instance de TextLoader en utilisant un chemin de fichier défini dans les variables d'environnement.
 * Ensuite, elle initialise un séparateur de texte avec les paramètres spécifiés et divise le document chargé en plusieurs parties.
 *
 * @returns {Promise<Document[]>} Une promesse qui se résout avec un tableau d'instances de Document, chaque instance représentant une partie du texte divisé.
 * @throws {Error} Lance une erreur si le chargement ou la division des documents échoue.
 */
export async function dataLoader(file) {
  try {
    const loader = new TextLoader(`${process.env.ROOT_DIRECTORY}${file}`);

    const splitter = splitDoc(500, 50);

    const docs = await loader.loadAndSplit(splitter);
    return docs;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Crée une instance de RecursiveCharacterTextSplitter configurée avec une taille de morceau et un chevauchement spécifiques.
 * Cette fonction permet de configurer facilement la manière dont le texte sera divisé en segments plus petits.
 *
 * @param {number} chunkSize - La taille de chaque morceau de texte (en caractères).
 * @param {number} chunkOverlap - Le nombre de caractères de chevauchement entre deux morceaux consécutifs.
 * @returns {RecursiveCharacterTextSplitter} Une instance de RecursiveCharacterTextSplitter configurée avec les paramètres fournis.
 */
export function splitDoc(chunkSize, chunkOverlap) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });

  return splitter;
}
