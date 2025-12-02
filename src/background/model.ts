import { pipeline, TextClassificationOutput, TextClassificationSingle } from "@huggingface/transformers";



export const MESSAGE = {
  PORT_ID: 'classifier',
  TYPE: {
    CLASSIFY: 'classify',
    ERROR: 'error',
    RESULTS: 'results',
  },
}

export const MODEL = {
    config: [
      'text-classification',
      'Heriot-WattUniversity/gbv-classifier-roberta-base-instruct-ONNX',
      {
        dtype: 'q4',
        device: 'webgpu',
      }
    ],
    format: (input: string) => `Classify the following message from a social media platform. It might contain a form of gender-based violence (GBV). Output 1 if it contains GBV, or 0 if not.  
    Text: ${input} 
    Choices: 1 for GBV, or 0 for Not GBV.
    Answer: `,  
};


type Result = {
  label: 0 | 1;
  score: number;
}

type ModelResult = {
  label: 'GBV' | 'Not GBV' | 0 | 1;
  score: number;
}

console.log('Loading classifier...');
const classifier = await pipeline(...MODEL.config)
console.log('Classifier loaded');


const normalise = (results: ModelResult[]): Result[] => {
  const normalise = (label: 'GBV' | 'Not GBV' | 0 | 1): 0 | 1 => {
    if (label === 'GBV') return 1;
    if (label === 'Not GBV') return 0;
    return label;
  }

  return results.map((result: ModelResult) => ({
    label: normalise(result.label),
    score: result.score as number
  }));
}

const classify = (texts: string[]): Promise<ModelResult[]> => {
  return classifier(texts.map(MODEL.format)).then(normalise);
}

const port = chrome.runtime.connect({ name: MESSAGE.PORT_ID });

port.onMessage.addListener(async (message) => {
  switch (message.type) {
    case MESSAGE.TYPE.CLASSIFY:
      classify(message.texts || [message.text]).then(results => {
        port.postMessage({ type: MESSAGE.TYPE.RESULTS, results });
      }).catch(error => {
        port.postMessage({
          type: MESSAGE.TYPE.ERROR,
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      });
      break;
    default:
      port.postMessage({
        type: MESSAGE.TYPE.ERROR,
        message: `Unknown message type: ${message.type}`
      });
      break;
  }
});




