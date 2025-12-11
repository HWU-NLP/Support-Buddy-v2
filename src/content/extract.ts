import { Tweet } from './tweet';

import { MESSAGE_PORT, MessageType } from '../common/message';

function setupClassifier() {
    const c = chrome.runtime.connect({ name: MESSAGE_PORT });
    connected = true;
    c.postMessage({ type: MessageType.STATUS });

    c.onMessage.addListener((message) => {
        switch (message.type) {
            case MessageType.LOADING: console.log("Model is loading"); break;
            case MessageType.READY: console.log("Model is ready"); break;
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
                            (elements[id] as HTMLElement).style.backgroundColor = '#00f';
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
    ids: [] as string[],
    texts: [] as string[]
}

// Find the virtual scroll container (the div with position:relative inside timeline)
function findVirtualScrollContainer(): HTMLElement | null {
    const timeline = document.querySelector('div[aria-label="Timeline: Your Home Timeline"], div[aria-label="Timeline: Conversation"]');

    if (!timeline) return null;

    // The virtual scroll container is the direct child div with position:relative
    const container = timeline.querySelector(':scope > div[style*="position: relative"]');
    return container as HTMLElement | null;
}
// Extract articles from a cellInnerDiv
function extractArticlesFromCell(cell: HTMLElement): void {
    const article = cell.querySelector('article[data-testid="tweet"]');
    if (!article) return;

    const statusId = Tweet.statusIdFromElement(article);
    if (!statusId) return;

    // Check if already observed (key exists in decisions)
    if (statusId in decisions) return;

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

// Observer for the virtual scroll container - watches for new cellInnerDiv additions
const virtualScrollObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => extractArticlesFromCell(node as HTMLElement));
    });
});

// Root observer to find and set up observation on the virtual scroll container
const rootObserver = new MutationObserver(() => {
    const container = findVirtualScrollContainer();
    if (container) {
        // Observe only childList changes (when cellInnerDiv elements are added/removed)
        // This is more efficient than subtree since we only care about direct children
        virtualScrollObserver.observe(container, {
            childList: true,  // Only watch for added/removed children
            // subtree: false - not needed since cellInnerDiv is direct child
        });

        // Extract any existing articles on initial load
        const existingCells = container.querySelectorAll('div[data-testid="cellInnerDiv"]');
        existingCells.forEach(cell => extractArticlesFromCell(cell as HTMLElement));

        rootObserver.disconnect();
    }
});

rootObserver.observe(document.body, {
    childList: true,
    subtree: true,
});

// Also try to find container immediately if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const container = findVirtualScrollContainer();
    if (container) {
        virtualScrollObserver.observe(container, { childList: true });
        const existingCells = container.querySelectorAll('div[data-testid="cellInnerDiv"]');
        existingCells.forEach(cell => extractArticlesFromCell(cell as HTMLElement));
        rootObserver.disconnect();
    }
}
