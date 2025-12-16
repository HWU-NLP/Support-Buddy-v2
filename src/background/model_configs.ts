export const BERT = {
    config: [
      'text-classification',
      'Heriot-WattUniversity/gbv-classifier-roberta-base-instruct-ONNX',
      {
        dtype: 'q4',
        device: 'webgpu',
      }
    ] as const,
    format: (input: string) => `Classify the following message from a social media platform. It might contain a form of gender-based violence (GBV). Output 1 if it contains GBV, or 0 if not.  
    Text: ${input} 
    Choices: 1 for GBV, or 0 for Not GBV.
    Answer: `,  
};

export const QWEN = {
  config: [
    'text-classification',
    'Qwen/Qwen2.5-VL-7B-Instruct',
    {
      dtype: 'q4',
      device: 'webgpu',
    }
  ] as const,
  format: (input: string) => `Classify the following message from a social media platform. It might contain a form of gender-based violence (GBV). Output 1 if it contains GBV, or 0 if not.  
  Text: ${input} 
  Choices: 1 for GBV, or 0 for Not GBV.
  Answer: `,  
};
