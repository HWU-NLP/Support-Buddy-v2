import { pipeline, TextClassificationOutput, TextClassificationPipeline } from "@huggingface/transformers";
import { MESSAGE_PORT, MessageType } from "../common/message";
import { BERT as MODEL } from "./model_configs";


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
      console.log("message recieved:", message)
      switch (message.type) {
        case MessageType.STATUS:
          p.postMessage({ type: classifier ? MessageType.READY : MessageType.LOADING });
          break;
        case MessageType.CLASSIFY:
          const texts = message.texts;
          
          classify(texts).then(results => {
            console.log("classifier results:", results)
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

    console.log("port listener added")
  }
});



console.log('Loading classifier...');
let classifier: TextClassificationPipeline | null = null;
const classifierPromise = pipeline(...MODEL.config).then((c) => {
  classifier = c;
  console.log('Classifier loaded');
  return c;
}).catch((err) => {
  console.error("classifier died: ", err);
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









