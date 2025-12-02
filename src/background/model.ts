import { pipeline, TextClassificationOutput, TextClassificationSingle } from "@huggingface/transformers";

type Result = {
  label: 'GBV' | 'Not GBV';
  score: number;
}

console.log('Loading classifier...');
const classifier = await pipeline(
  'text-classification',
  'Heriot-WattUniversity/gbv-classifier-roberta-base-instruct-ONNX',
  {
    dtype: 'q4',
    device: 'webgpu',
  }
)

const formatInstruction = (text: string) => 
  `Classify the following message from a social media platform. It might contain a form of gender-based violence (GBV). Output 1 if it contains GBV, or 0 if not. 
  Text: ${text} 
  Choices: 1 for GBV, or 0 for Not GBV.
  Answer: `;

const retypeResults = (results: any[]): {label: 0 | 1, score: number}[] => {
  return results.map((result: any) => ({
     label: result.label === 'GBV' ? 1 : 0,
     score: result.score as number 
  }));
}

const inferBatch = (texts: string[]): Promise<{label: 0 | 1, score: number}[]> => {
  return classifier(texts.map(formatInstruction)).then( retypeResults );
}

const port = chrome.runtime.connect({ name: 'classifier' });

port.onMessage.addListener(async (message) => {
  switch (message.type) {
    case 'classify':
      try {
        const results = await inferBatch(message.texts || [message.text]);
        port.postMessage({ type: 'results', results });
      } catch (error) {
        port.postMessage({ type: 'error', message: error instanceof Error ? error.message : 'Unknown error' } as any);
      }
      break;
    default:
      port.postMessage({ type: 'error', message: `Unknown message type: ${message.type}` } as any);
      break;
  }
});
