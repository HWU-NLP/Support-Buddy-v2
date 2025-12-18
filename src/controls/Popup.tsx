import React, { useState, useEffect, useRef } from 'react';
import '../common/colours.css';
import './popup.css';
import Toggle from '../common/Toggle';
import MultiToggle from '../common/MultiToggle';


const settings: {
  enabled: boolean,
  hideIt: boolean,
  hideOption: number,
  reportIt: boolean,
  help: boolean
} = await chrome.storage.sync.get(['enabled', 'hideIt', 'hideOption', 'reportIt', 'help']);

 

const Popup: React.FC = () => {

  enum HideOption {
    Block = 2,
    Obscure = 1,
    Reveal = 0
  }

  
  const [refreshPromptShown, setRefreshPromptShown] = useState(false);

  const [enabled, setEnabled] = useState(settings.enabled);
  const [hideIt, setHideIt] = useState(settings.hideIt);
  const [hideOption, setHideOption] = useState<number>(settings.hideOption);
  const [reportIt, setReportIt] = useState(settings.reportIt);
  const [help, setHelp] = useState(settings.help);



  const store = (values: any) => chrome.storage.sync.set(values);
  

  useEffect(() => {
    store({ enabled: enabled }).then(() => {
      showRefreshPrompt();
    });
  }, [enabled]);


  const hideOptionMessage = (hideOption: HideOption) => {
    switch (hideOption) {
      case HideOption.Reveal:
        return 'Content reveals on click';
      case HideOption.Obscure:
        return 'Content is obscured';
      case HideOption.Block:
        return 'Content does not appear in the feed';
    }
  }

  const showRefreshPrompt = () => {
    setRefreshPromptShown(true);
    setTimeout(() => {
      setRefreshPromptShown(false);
    }, 3000);
  }

  useEffect(() => {
    store({ hideIt: hideIt }).then(() => {
      showRefreshPrompt();
    });
  }, [hideIt]);

  useEffect(() => {
    store({ hideOption: hideOption }).then(() => {
      showRefreshPrompt();
    });
  }, [hideOption]);

  useEffect(() => {
    store({ reportIt: reportIt }).then(() => {
      showRefreshPrompt();
    });
  }, [reportIt]);

  useEffect(() => {
    store({ help: help }).then(() => {
      showRefreshPrompt();
    });
  }, [help]);





  const [statusMessage, setStatusMessage] = useState<{ message: string; type: string; show: boolean }>({
    message: '',
    type: '',
    show: false
  });

  // const updateStatus = (message: string, type: string) => {
  //   setStatusMessage({ message, type, show: true });
  //   setTimeout(() => {
  //     setStatusMessage({ ...statusMessage, show: false });
  //   }, 3000);
  // };

  const mainCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let height = 382;
    if (!enabled) {
      height = 200;
    } else if (hideIt) {
      if (hideOption === HideOption.Reveal) {
        height = 498
      } else {
        height = 377;
      }
    }
    height += 12;
    document.body.style.height = `${height}px`;
  }, [hideIt, hideOption, enabled]);


  const reloadXTabs = async () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      // Query all tabs where the URL matches X.com or twitter.com domains
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (
            tab.url &&
            (
              tab.url.match(/^https?:\/\/(www\.)?twitter\.com\//) ||
              tab.url.match(/^https?:\/\/(www\.)?x\.com\//)
            ) &&
            tab.id
          ) {
            chrome.tabs.reload(tab.id);
          }
        });
      });
    }
  };    


  return (
    <>
      <div className="main-card" ref={mainCardRef} role="region" aria-label="Extension settings">
        {/* Refresh prompt overlay */}
        <div
          className={`refresh-prompt ${refreshPromptShown ? 'show' : ''}`}
          role="status"
          aria-live="polite"
        >
          <span>Refresh X for the changes to take effect.</span>
          <button className="refresh-button" onClick={reloadXTabs}  >
            <i className="fas fa-refresh"></i>
          </button>
        </div>

        {/* Header */}
        <div className="header" role="heading" aria-level={1}>
          <div className="header-icon">
            <i className="fas fa-hand-holding-heart"></i>
          </div>
          <div className="header-text">
            Making your social <br /> media safer.
          </div>
        </div>

        {/* Main Enable Toggle */}
        <div className="toggle-section-main" title="Enable or disable the extension"
          aria-label="Enable or disable the extension">
          <div className="toggle-left">
            <div className={`toggle-icon enable`}>
              <i className="fas fa-power-off"></i>
            </div>
            <div className={`toggle-text enable`}>{enabled ? "Enabled" : "Disabled"}</div>
          </div>
          <Toggle checked={enabled} onClick={() => setEnabled(!enabled)} />
        </div>
        <div className={`conditional-toggles ${enabled ? 'show' : ''}`}>
          {/* Hide It Selection */}
          <div className="toggle-section" title="Hide or show all content"
            aria-label="Hide or show all content">
            <div className="toggle-left">
              <div className={`toggle-icon hide`}>
                <i className="fas fa-eye"></i>
              </div>
              <div className={`toggle-text hide`}>Hide it</div>
            </div>
            <Toggle checked={hideIt} onClick={() => setHideIt(!hideIt)} />
          </div>

          {/* Multi-Toggle Section */}
          <div className={`multi-toggle-container ${hideIt ? 'show' : 'hide'}`}
            aria-label="Choose how to hide content"
          >
            <MultiToggle
              selectedIndex={hideOption}
              options={[
                { label: "Option to reveal", icon: "fas fa-eye", onClick: () => setHideOption(0), title: "Post will be blurred out, but you can click to see it" },
                { label: "No option<br/> to reveal", icon: "fas fa-eye-low-vision", onClick: () => setHideOption(1), title: "Post will always be blurred out" },
                { label: "Remove all trace", icon: "fas fa-ban", onClick: () => setHideOption(2), title: "You will not see any sign of the post or poster" }]
              }
            />
          </div>

          {/* Conditional Toggles (only visible when hideOption is "reveal") */}
          <div className={`conditional-toggles ${(hideOption === HideOption.Reveal || !hideIt) ? 'show' : ''}`}>
            <div className="toggle-section" title="Show options to report harmful content"
              aria-label="Show options to report harmful content">
              <div className="toggle-left">
                <div className={`toggle-icon report`}>
                  <i className="fas fa-flag"></i>
                </div>
                <div className={`toggle-text report`}>Report it</div>
              </div>
              <Toggle checked={reportIt} onClick={() => setReportIt(!reportIt)} />
            </div>

            <div className="toggle-section" title="Show options to get help"
              aria-label="Show options to get help">
              <div className="toggle-left">
                <div className={`toggle-icon help`}>
                  <i className="fas fa-heart"></i>
                </div>
                <div className={`toggle-text help`}>Get help</div>
              </div>
              <Toggle checked={help} onClick={() => setHelp(!help)} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className={`status-message ${statusMessage.type} ${statusMessage.show ? 'show' : ''}`}>
        {statusMessage.message}
      </div>
      <div className="fixed-layer">
        {/* Footer Buttons */}
        <div className="footer-buttons">
          <button className="footer-button">
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </button>
          <button className="footer-button">
            <i className="fas fa-lock"></i>
            <span>Privacy</span>
          </button>
        </div>

      </div>
    </>
  );
};

export default Popup;