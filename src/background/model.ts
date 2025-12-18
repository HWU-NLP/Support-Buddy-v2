import { pipeline, TextClassificationOutput, TextClassificationPipeline } from "@huggingface/transformers";
import { MESSAGE_PORT, MessageType } from "../common/message";
import { BERT as MODEL } from "./model_configs";

const log = (...args: unknown[]) => {
  console.log(`[${new Date().toISOString()}]`, ...args);
};

const logError = (...args: unknown[]) => {
  console.error(`[${new Date().toISOString()}]`, ...args);
};

type Result = {
  label: 0 | 1;
  score: number;
}

type RawModelResult = {
  label: 'GBV' | 'Not GBV' | '0' | '1';
  score: number;
}

let port: chrome.runtime.Port | null = null;

chrome.runtime.onConnect.addListener((p) => {
  if (p.name === MESSAGE_PORT) {
    port = p;
    p.onMessage.addListener(async (message) => {
      log("message recieved");
      switch (message.type) {
        case MessageType.STATUS:
          p.postMessage({ type: classifier ? MessageType.READY : MessageType.LOADING });
          break;
        case MessageType.CLASSIFY:
          const texts = message.texts;
          log({ids: message.ids[0], texts: texts[0]});
          
          classify(texts).then(results => {
            log({ids: message.ids[0], results: results[0].label});
            // Returns the unmutated input ids for tracking
            p.postMessage({ 
              type: MessageType.RESULTS,
              results, ids: message.ids
            });
          }).catch(
            error => p.postMessage({ type: MessageType.ERROR, message: error instanceof Error ? error.message : 'Unknown error' }));
          break;
        default:
          p.postMessage({
            type: MessageType.ERROR,
            message: `Unknown message type: ${message.type}`
          });
          break;
      }
    });

    log("port listener added")
  }
});

log('Loading classifier...');
let classifier: TextClassificationPipeline | null = null;
const classifierPromise = pipeline(...MODEL.config).then((c) => {
  classifier = c;
  log('Classifier loaded');
  return c;
}).catch((err) => {
  logError("classifier died: ", err);
  throw err;
});



const normalise = (results: TextClassificationOutput | TextClassificationOutput[]): Result[] => {
  const r = results as RawModelResult[];
  const normalise = (label: 'GBV' | 'Not GBV' | '0' | '1'): 0 | 1 => {
    switch (label) {
      case '1': case 'GBV':     return 1;
      case '0': case 'Not GBV': return 0;
    }
  }
  return r.map((result: RawModelResult) => ({ label: normalise(result.label), score: result.score }));
}

const loadClassifier = async () => classifier ?? classifierPromise;

const classify = async (texts: string[]): Promise<Result[]> => {
  const c = await loadClassifier();
  const outputs = await c(texts.map(MODEL.format))
  return normalise(outputs);
}









