import { Tweet } from './tweet';
import { TimelineObserver } from './timelineObserver';
import { MESSAGE_PORT, MessageType } from '../common/message';
import { injectUIElements } from './ui';

function setupClassifier() {
    const c = chrome.runtime.connect({ name: MESSAGE_PORT });
    connected = true;
    c.postMessage({ type: MessageType.STATUS });

    c.onMessage.addListener((message: any) => {
        switch (message.type) {
            case MessageType.LOADING: console.log("Model is loading"); break;
            case MessageType.READY: console.log("Model is ready"); break;
            case MessageType.RESULTS:

                // Match results back to ids by index
                // Note: results come back in the same order as inputs were sent
                if (message.results && message.ids) {
                    message.results.forEach((result: { label: 0 | 1; score: number }, index: number) => {
                        const id = message.ids[index];
                        console.log(id, " classification recieved:", result.label ? 'Positive' : '0');
                        decisions[id] = result.label;

                        const tweet = Tweet.fromElement(elements[id]);
                        if (tweet) {
                            tweet.element.setAttribute('gbv', result.label ? '1' : '0');
                            injectUIElements(tweet);
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

let elements: Record<string, HTMLElement> = {};


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

// Extract articles from a cellInnerDiv
function extractArticlesFromCell(cell: HTMLElement): void {
    const article = cell.querySelector('article[data-testid="tweet"]');
    if (!article) return;
    const tweet = Tweet.fromElement(article);
    if (!tweet) {
        article.setAttribute('gbv', '0');
        return;
    };



    // Check if already observed (key exists in decisions)
    if (tweet.statusId in decisions) {
        if (tweet.element.getAttribute('gbv')) return;
        tweet.element.setAttribute('gbv', decisions[tweet.statusId] ? '1' : '0');
        if (decisions[tweet.statusId]) injectUIElements(tweet);
        return;
    };

    if (!connected) classifier = setupClassifier();
    // Mark as observed, pending classification
    decisions[tweet.statusId] = undefined;
    console.log(tweet.statusId, tweet.author);
    elements[tweet.statusId] = tweet.element;
    if (tweet.text === '') {
        decisions[tweet.statusId] = 0;
        tweet.element.setAttribute('gbv', '0');
        return;
    }

    classifier.postMessage({
        type: MessageType.CLASSIFY,
        texts: [tweet.text],
        ids: [tweet.statusId]
    });

    // tweet.element.setAttribute('gbv', '');
    // tweet.element.style.backgroundColor = '#0f0';
}

const virtualScrollObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            extractArticlesFromCell(node as HTMLElement);
        });
    });
});


// Find the virtual scroll container (the div with position:relative inside timeline)
function findVirtualScrollContainer(): HTMLElement | null {
    const timeline = document.querySelector('div[aria-label^="Timeline:"]');

    if (!timeline) return null;

    // The virtual scroll container is the direct child div with position:relative
    const container = timeline.querySelector(':scope > div[style*="position: relative"]');
    return container as HTMLElement | null;
}

// Root observer to find and set up observation on the virtual scroll container
const rootObserver = new MutationObserver(() => {
    const container = findVirtualScrollContainer();
    if (container) {
        // Observe only childList changes (when cellInnerDiv elements are added/removed)
        // This is more efficient than subtree since we only care about direct children
        virtualScrollObserver.observe(container, {
            childList: true,  // Only watch for added/removed children
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
        existingCells.forEach(cell => {
            extractArticlesFromCell(cell as HTMLElement);
        });
        rootObserver.disconnect();
    }
}


let lastHref = window.location.href;

['click', 'popstate'].forEach(event => {
    window.addEventListener(event, () => {
        setTimeout(() => {
            const currentHref = window.location.href;
            if (currentHref !== lastHref) {
                lastHref = currentHref;
                // Disconnect first to avoid duplicate observers
                rootObserver.disconnect();
                rootObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        }, 500);
    }, true);
});