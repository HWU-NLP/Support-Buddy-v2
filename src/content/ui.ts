import { Tweet } from "./tweet";
import { TimelineObserver } from './timelineObserver';

const fa_eye = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`

const fa_eye_low_vision = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`

const fa_ban = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`

const fa_warn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`


// Import CSS file to ensure Parcel bundles it
import "./ui.css";

enum HideOption {
  Block = 2,
  Obscure = 1,
  Reveal = 0
}


let settings = {
  enabled: false as boolean,
  hideIt: false as boolean,
  hideOption: HideOption.Reveal as HideOption,
  reportIt: false as boolean,
  help: false as boolean,
};

chrome.storage.sync.get(['enabled', 'hideIt', 'hideOption', 'reportIt', 'help']).then((result) => {
  settings.enabled = result.enabled as boolean;
  settings.hideIt = result.hideIt as boolean;
  settings.hideOption = result.hideOption as HideOption;
  settings.reportIt = result.reportIt as boolean;
  settings.help = result.help as boolean;


  const reportContent = document.querySelector('.support-buddy-report-content');
  const helpContent = document.querySelector('.support-buddy-help-content');
  if (reportContent) settings.reportIt ? reportContent.classList.remove('hidden') : reportContent.classList.add('hidden');
  if (helpContent) settings.help ? helpContent.classList.remove('hidden') : helpContent.classList.add('hidden');
  console.log(settings);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'sync') return;

  if ('enabled' in changes) settings.enabled = changes.enabled.newValue as boolean;
  if ('hideIt' in changes) settings.hideIt = changes.hideIt.newValue as boolean;
  if ('hideOption' in changes) settings.hideOption = changes.hideOption.newValue as HideOption;
  if ('reportIt' in changes) settings.reportIt = changes.reportIt.newValue as boolean;
  if ('help' in changes) settings.help = changes.help.newValue as boolean;

  const reportContent = document.querySelector('.support-buddy-report-content');
  const helpContent = document.querySelector('.support-buddy-help-content');
  if (reportContent) settings.reportIt ? reportContent.classList.remove('hidden') : reportContent.classList.add('hidden');
  if (helpContent) settings.help ? helpContent.classList.remove('hidden') : helpContent.classList.add('hidden');
  console.log('Settings changed:', settings)
});
class Tweets {
  private map: Map<string, Tweet>;

  constructor() {
    this.map = new Map<string, Tweet>();
  }

  get(statusId: string): Tweet | undefined {
    return this.map.get(statusId);
  }

  set(statusId: string, tweet: Tweet): void {
    this.map.set(statusId, tweet);
  }

  has(statusId: string): boolean {
    return this.map.has(statusId);
  }
  clear(): void {
    this.map.clear();
  }
}


function classify(batch: Tweet[]) {
  chrome.runtime.sendMessage({ type: 'CLASSIFY', batch });
  return new Promise((resolve, reject) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'CLASSIFY_RESPONSE') {
        resolve(message.response);
      }
    });
  });
}

const tweets = new Tweets();

// Function to suspend all video playback
function suspendAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    if (!video.paused) {
      video.pause();
    }
  });
}

// Monitor for video play events and pause them
document.addEventListener('play', (e) => {
  const target = e.target as HTMLVideoElement;
  if (target && target.tagName === 'VIDEO') {
    target.pause();
  }
}, true); // Use capture phase to catch events early

// Set up observer for dynamically loaded tweets


function insertBadge(article: HTMLElement, statusId: string) {
  article.style.position = 'relative';
  const badgeIcon = `
    <button type="button" class="support-buddy-badge-icon">
      <svg width="20" height="20" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.4016 0C21.5731 0 22.6488 0.645469 23.2066 1.67344L40.4191 33.5484C40.9531 34.5366 40.9291 35.7319 40.3554 36.6961C39.7816 37.6603 38.7377 38.25 37.6141 38.25H3.18915C2.06555 38.25 1.02165 37.6603 0.447896 36.6961C-0.125854 35.7319 -0.14976 34.5366 0.384147 33.5484L17.5966 1.67344C18.1545 0.645469 19.2302 0 20.4016 0ZM20.4016 28.05C18.9912 28.05 17.8516 29.1895 17.8516 30.6C17.8516 32.0105 18.9912 33.15 20.4016 33.15C21.8121 33.15 22.9516 32.0105 22.9516 30.6C22.9516 29.1895 21.8121 28.05 20.4016 28.05ZM20.4016 12.75C18.9513 12.75 17.7959 13.9852 17.8995 15.4355L18.4891 23.723C18.5609 24.7191 19.3976 25.5 20.3937 25.5C21.3977 25.5 22.2265 24.727 22.2982 23.723L22.8879 15.4355C22.9915 13.9852 21.844 12.75 20.3857 12.75H20.4016Z"/>
      </svg>
      <span class="support-buddy-badge-text">Support Buddy</span>
    </button>
    <div class="support-buddy-badge-tooltip">More actions are available if you reveal the post, but remember you don't have to</div>
  `;

  const badgeIconElement = document.createElement('div');
  badgeIconElement.className = 'support-buddy-badge';
  badgeIconElement.innerHTML = badgeIcon;
  article.parentElement?.insertBefore(badgeIconElement, article.nextSibling);

  const button = badgeIconElement.querySelector('button');
  if (!button) return;
  button.onclick = () => annotateModal(article, statusId);
}


function getOverlayPosition(article: HTMLElement, overlay: HTMLElement) {
  const articleRect = article.getBoundingClientRect();
  const overlayRect = overlay.getBoundingClientRect();
  return { 
    top: articleRect.top - overlayRect.top,
    left: articleRect.left - overlayRect.left,
    width: articleRect.width,
    height: articleRect.height
  };
}


// Create backdrop overlay that covers the entire page
const backdrop = document.createElement('div');
backdrop.className = 'support-buddy-backdrop';
backdrop.style.pointerEvents = 'none';
document.body.appendChild(backdrop);  

// Container for the section and buttons
// const right = document.createElement('div');
// right.className = 'support-buddy-right-section';
// document.body.appendChild(right);


const infoBubble = document.createElement('div');
infoBubble.className = 'support-buddy-info-bubble';
infoBubble.innerHTML = `
  <button class="support-buddy-close-button" aria-label="Close">
    <svg class="close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <div class="actions-header">Support Buddy</div>

  <div class="alert-message">
    This post likely contains hate towards women and girls.
  </div>

  <div class="actions-content support-buddy-report-content">
    <div class="actions-text">
      To report it to X, click the button below.
    </div>
    <button type="button" id="report-to-x" class="action-button action-button-primary">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Report to X
    </button>

    <h3 class="actions-text">
      If you have already reported it to X, and they have not acted, visit:
    </h3>

    <a id="report-harmful-content" href="https://reportharmfulcontent.com/" class="action-button action-button-primary" target="_blank">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Report Harmful Content
    </a>

    <div class="actions-text">Or if it involves an intimate image of you:</div>

    <a id="revenge-porn-helpline" href="https://revengepornhelpline.org.uk/" class="action-button action-button-primary" target="_blank">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Revenge Porn Helpline
    </a>
    <a id="stop-ncii" href="https://stopncii.org/" class="action-button action-button-primary" target="_blank">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Stop NCII
    </a>

    <div class="actions-note">
      Please note that while these services work hard to get content taken down they cannot guarantee X will act.
    </div>
  </div>

  <div class="actions-content support-buddy-help-content">
    <div class="actions-text">
      Remember, you're not alone when you're online - help is just a click or a call away.
    </div>
    <a id="get-support" href="https://reportharmfulcontent.com/advice/other/further-advice/other-support/" class="action-button action-button-secondary" target="_blank">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Get Support
    </a>

    <!-- <button class="action-button action-button-tertiary">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Hide This Post
    </button> -->
  </div>
`;
backdrop.appendChild(infoBubble);
!settings.reportIt && infoBubble.querySelector('.support-buddy-report-content')?.classList.add('hidden');
!settings.help && infoBubble.querySelector('.support-buddy-help-content')?.classList.add('hidden');




function annotateModal(article: HTMLElement, statusId: string) {

  suspendAllVideos();

  const clientWidth = document.documentElement.clientWidth;

  document.documentElement.classList.add('support-buddy-annotate');
  document.body.classList.add('support-buddy-annotate');
  // prevent a jitter when the scrollbar is hidden
  document.body.style.width = clientWidth + 'px';

  let escapeHandler: ((e: KeyboardEvent) => void) | null = null;
  let backdropClickHandler: (() => void) | null = null;

  const exitModal = () => {
    // Remove event listeners
    if (escapeHandler) {
      window.removeEventListener('keydown', escapeHandler);
    }
    if (backdropClickHandler) {
      backdrop.removeEventListener('click', backdropClickHandler);
    }
    
    document.documentElement.classList.remove('support-buddy-annotate');
    document.body.classList.remove('support-buddy-annotate');
    document.body.querySelector('#support-buddy-annotated-article')?.remove();
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';
    document.body.style.width = 'auto';
    document.querySelector('.support-buddy-info-bubble')?.classList.remove('show');
  }

  backdropClickHandler = exitModal;
  backdrop.addEventListener('click', backdropClickHandler);
  
  escapeHandler = (e: KeyboardEvent) => {
    e.key === 'Escape' && exitModal();
  };
  window.addEventListener('keydown', escapeHandler);


  // Ensure transition works on entry by using requestAnimationFrame
  backdrop.style.pointerEvents = 'auto';
  requestAnimationFrame(() => {
    backdrop.style.opacity = '1';
  });


  // Copy the article to the overlay

  const articleCopy = article.cloneNode(true) as HTMLElement;
  articleCopy.id = 'support-buddy-annotated-article';
  backdrop.appendChild(articleCopy);

  let { top, left, width, height } = getOverlayPosition(article, articleCopy);
  articleCopy.style.top = `${top}px`;
  articleCopy.style.left = `${left}px`;
  articleCopy.style.width = `${width}px`;
  articleCopy.style.height = `${height}px`;

  // Align the top of infoBubble with the top of articleCopy
  const infoBubbleElem = document.querySelector('.support-buddy-info-bubble') as HTMLElement | null;
  if (infoBubbleElem) {
    // Place the infoBubble to the right of the articleCopy, aligned to its top
    // Calculate a right offset, but don't let it overflow off the screen
    const articleRect = articleCopy.getBoundingClientRect();
    infoBubbleElem.style.top = `${articleRect.top}px`;
    infoBubbleElem.style.left = `${articleRect.right}px`;
    infoBubbleElem.classList.add('show');
  
  // Add click handler to close button  
    const closeButton = infoBubbleElem.querySelector('.support-buddy-close-button') as HTMLElement | null;
    if (closeButton) {
      closeButton.onclick = exitModal;
    }
  }

  // Add click handler to report button
  const reportButton = infoBubbleElem?.querySelector('#report-to-x') as HTMLElement | null;
  if (reportButton) {
    reportButton.onclick = () => {
      triggerXReportAction(article, statusId); // Use the original article, not articleCopy
      
      exitModal();
    };
  }
}


function censor(article: HTMLElement, statusId: string) {
  const overlay = document.createElement('div');
  // Find the badge within the article and apply a "disabled" class to it
  const badge = article.parentElement?.querySelector('.support-buddy-badge') as HTMLElement | null;
  badge?.classList.add('disabled');
  article.classList.add('support-buddy-censor');
  overlay.className = 'support-buddy-censor-overlay';
  article.parentElement?.insertBefore(overlay, article.nextSibling);
  const canReveal = settings.hideOption === HideOption.Reveal;
  if (canReveal) {
    overlay.addEventListener('click', function handler() {
      article.classList.remove('support-buddy-censor');
      overlay.classList.add('reveal');      
      overlay.removeEventListener('click', handler);
      overlay.style.pointerEvents = 'none';
      badge?.classList.remove('disabled');
      setTimeout(() => badge?.classList.add('emphasis'), 200);
      setTimeout(() => { overlay.remove(); badge?.classList.remove('emphasis'); }, 1000);
    });
    // a debug feature to remove all injected elements
    overlay.addEventListener('contextmenu', function handler(e) {
      e.preventDefault();
      article.classList.remove('support-buddy-censor');
      overlay.remove();
      badge?.remove();
    });

    // re censor the article if the context menu is clicked
    article.addEventListener('contextmenu', function handler(e) {
      e.preventDefault();
      insertBadge(article, statusId);
      censor(article, statusId);
    });
  }

  // Insert custom content into the overlay when obscuring
  overlay.innerHTML = `
    <div class="support-buddy-censor-content">
      <div class="support-buddy-censor-icon">
        ${canReveal ? fa_eye : fa_eye_low_vision}
      </div>
      <div class="support-buddy-censor-title">
        ${canReveal ? 'Click to show' : 'Content hidden'}
      </div>
    </div>`;
}



function block(article: HTMLElement) {
  article.classList.add('support-buddy-block');
}

function triggerXReportAction(article: HTMLElement, statusId: string) {
  // Find the original tweet element (not the cloned one)
  // The article parameter in annotateModal is the original tweet
  const tweet = tweets.get(statusId);

  if (!tweet) console.error('Tweet not found for statusId:', statusId);

  console.log('Reporting Tweet (statusId:', statusId, '):', tweet);
  console.log('URL:', `https://x.com/${tweet?.author}/status/${statusId}`);

  // Method 1: Find the menu button (three dots) - common data-testid values
  const menuButton = article.querySelector('[data-testid="caret"]') as HTMLElement;
  
  if (menuButton) {
    // Click to open the menu
    menuButton.click();
    
    // Wait for menu to appear, then find and click "Report"
    setTimeout(() => {
      // Look for the report option in the dropdown menu
      // Common patterns: text content "Report" or specific data-testid
      const reportOption = Array.from(document.querySelectorAll('[role="menuitem"]'))
        .find(item => item.textContent?.includes('Report')) as HTMLElement;
      
      if (reportOption) {
        reportOption.click();
      } else {
        // Fallback: try finding by aria-label or other attributes
        const reportByLabel = document.querySelector('[aria-label*="Report" i]') as HTMLElement;
        if (reportByLabel) {
          reportByLabel.click();
        }
      }
    }, 300); // Wait for menu animation
  } else {
    // Fallback: Try alternative selectors
    const altMenuButton = article.querySelector('button[aria-label*="More" i]') as HTMLElement;
    if (altMenuButton) {
      altMenuButton.click();
      setTimeout(() => {
        const reportOption = Array.from(document.querySelectorAll('[role="menuitem"]'))
          .find(item => item.textContent?.includes('Report')) as HTMLElement;
        if (reportOption) reportOption.click();
      }, 300);
    }
  }
}

function injectUIElements(node: HTMLElement) {
  
}

// Set up timeline observer with injectUIElements as the processor
const timelineObserver = new TimelineObserver({
    onCellAdded: injectUIElements
});
