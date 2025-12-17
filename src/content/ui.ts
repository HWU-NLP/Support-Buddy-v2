import { Tweet } from "./tweet";
import { TimelineObserver } from './timelineObserver';
import { infoBubbleTemplate, badgeIconTemplate } from './templates';

const fa_eye = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`

const fa_eye_low_vision = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`

const fa_ban = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`

const fa_warn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/></svg>`


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

// Function to suspend all video playback
function suspendAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => !video.paused && video.pause());
}

// Monitor for video play events and pause them
document.addEventListener('play', (e) => {
  const target = e.target as HTMLVideoElement;
  if (target && target.tagName === 'VIDEO') {
    target.pause();
  }
}, true); // Use capture phase to catch events early


function insertBadge(article: HTMLElement, statusId: string) {
  article.style.position = 'relative';

  const badgeIconElement = document.createElement('div');
  badgeIconElement.className = 'support-buddy-badge';
  badgeIconElement.innerHTML = badgeIconTemplate;
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
infoBubble.innerHTML = infoBubbleTemplate;
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

function injectUIElements(tweet: Tweet) {
  const gbvClass = tweet.element.getAttribute('gbvclass');
  
  if (gbvClass === 'gbv') {
    if (!settings.hideIt) {
      insertBadge(tweet.element, tweet.statusId);
    } else {
      switch (settings.hideOption) {
        case HideOption.Block:
          block(tweet.element);
          break;
        case HideOption.Obscure: case HideOption.Reveal:
          insertBadge(tweet.element, tweet.statusId);
          censor(tweet.element, tweet.statusId);
          break;
      }
    }
  }
}

// Set up timeline observer with injectUIElements as the processor
const timelineObserver = new TimelineObserver({
    onTweetAdded: injectUIElements
});

