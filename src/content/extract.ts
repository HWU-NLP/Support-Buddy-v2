export class Tweet {

    text: string; // Text of the tweet
    id: string; // Status id from url
    author: string; // Author of the tweet
    date: string; // Creation date of the tweet
    imageURLs: string; // URL of the image in the tweet
    imageCaptions: string; // Caption of the image in the tweet
    
    constructor(article: HTMLElement) {
        // get from DOM
    }
}

const classifier = chrome.runtime.connect({ name: 'classifier' });

classifier.onDisconnect.addListener(() => {
    console.error('Classifier disconnected');
});

chrome.runtime.onConnect.addListener((port) => {
    (port.name === 'classifier') && console.log(`Classifier connected`);
});

classifier.onMessage.addListener((message) => {
    switch (message.type) {
        case 'results':
            console.log(message.results);
            break;
        case 'error':
            console.error(message.message);
            break;
        default:
            console.warn(`Unknown message type: ${message.type}`);
            break;
    }
});

 