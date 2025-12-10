export const MESSAGE_PORT = 'classifier' as const;

export enum MessageType {
  CLASSIFY = 'classify',
  ERROR = 'error',
  RESULTS = 'results',
  LOADING = 'loading',
  READY = 'ready',
  STATUS = 'status',
}

