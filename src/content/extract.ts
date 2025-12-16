import { Tweet } from './tweet';
import { TimelineObserver } from './timelineObserver';
import { MESSAGE_PORT, MessageType } from '../common/message';

function setupClassifier() {
    const c = chrome.runtime.connect({ name: MESSAGE_PORT });
    connected = true;
    c.postMessage({ type: MessageType.STATUS });

    c.onMessage.addListener((message: any) => {
        switch (message.type) {
            case MessageType.LOADING: console.log("Model is loading"); break;
            case MessageType.READY  : console.log("Model is ready");   break;
            case MessageType.RESULTS:

                // Match results back to ids by index
                // Note: results come back in the same order as inputs were sent
                if (message.results && message.ids) {
                    message.results.forEach((result: { label: 0 | 1; score: number }, index: number) => {
                        const id = message.ids[index];
                        console.log(id, " classification recieved")
                        decisions[id] = result.label;

                        if (elements[id]) {
                            elements[id].setAttribute('gbvclass', result.label ? 'gbv' : 'benign');
                            (elements[id] as HTMLElement).style.backgroundColor = result.label ? "#f00" : "#00f";
                        }
                    });
                }
                break;
            case MessageType.ERROR: console.log("Model error", message)
        }
    });
    c.onDisconnect.addListener(() => {
        connected = false;
        console.log("Model disconnected");
    })
    return c;
}

let connected = false;
let classifier = setupClassifier();

let elements: Record<string, Element> = {};


/**
 * 
 * id in decisions -> observed
 * 
 * value is undefined -> pending classification
 * 
 * value is 0 | 1 -> classified
 */
let decisions: Record<string, 0 | 1 | undefined> = {};



const BATCH_SIZE = 1;
let batch = {
    ids  : [] as string[],
    texts: [] as string[]
}

// Extract articles from a cellInnerDiv
function extractArticlesFromCell(cell: HTMLElement): void {
    const article = cell.querySelector('article[data-testid="tweet"]');
    if (!article) return;

    const statusId = Tweet.statusIdFromElement(article);
    if (!statusId) return;

    // Check if already observed (key exists in decisions)
    if (statusId in decisions) {
        if (article.getAttribute('gbvclass')) return;

        article.setAttribute('gbvclass', decisions[statusId]? 'gbv' : 'benign');
        (article as HTMLElement).style.backgroundColor = decisions[statusId] ? '#f00' : '#00f';
        return;
    };

    // Mark as observed, pending classification
    decisions[statusId] = undefined;
    const tweet = Tweet.fromElement(article);


    if (!tweet) return;

    batch.ids.push(statusId);
    batch.texts.push(tweet.text);
    console.log(statusId, tweet.author);
    elements[statusId] = article;

    if (batch.ids.length >= BATCH_SIZE) {
        if (!connected) classifier = setupClassifier();

        classifier.postMessage({
            type: MessageType.CLASSIFY,
            texts: batch.texts,
            ids: batch.ids
        });
        batch = { ids: [], texts: [] };
    }

    article.setAttribute('gbvclass', 'pending');
    (article as HTMLElement).style.backgroundColor = '#0f0';
}

// Set up timeline observer with extractArticlesFromCell as the processor
const timelineObserver = new TimelineObserver({
    onCellAdded: extractArticlesFromCell,
    onNavigationChange: () => {
        console.log("column test triggered");
    }
});