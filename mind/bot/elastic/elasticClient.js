import { Client } from '@elastic/elasticsearch';

const config = {
  node: process.env.ELASTIC_URL ?? 'http://127.0.0.1:9200',
};
if (process.env.ELASTIC_API_KEY) {
  config.auth = {
    apiKey: process.env.ELASTIC_API_KEY,
  };
} else if (process.env.ELASTIC_USERNAME && process.env.ELASTIC_PASSWORD) {
  config.auth = {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  };
}

const elasticClient = new Client(config);

export default elasticClient;
