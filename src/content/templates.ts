export const infoBubbleTemplate = `
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

export const badgeIconTemplate = `
<button type="button" class="support-buddy-badge-icon">
  <svg width="20" height="20" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.4016 0C21.5731 0 22.6488 0.645469 23.2066 1.67344L40.4191 33.5484C40.9531 34.5366 40.9291 35.7319 40.3554 36.6961C39.7816 37.6603 38.7377 38.25 37.6141 38.25H3.18915C2.06555 38.25 1.02165 37.6603 0.447896 36.6961C-0.125854 35.7319 -0.14976 34.5366 0.384147 33.5484L17.5966 1.67344C18.1545 0.645469 19.2302 0 20.4016 0ZM20.4016 28.05C18.9912 28.05 17.8516 29.1895 17.8516 30.6C17.8516 32.0105 18.9912 33.15 20.4016 33.15C21.8121 33.15 22.9516 32.0105 22.9516 30.6C22.9516 29.1895 21.8121 28.05 20.4016 28.05ZM20.4016 12.75C18.9513 12.75 17.7959 13.9852 17.8995 15.4355L18.4891 23.723C18.5609 24.7191 19.3976 25.5 20.3937 25.5C21.3977 25.5 22.2265 24.727 22.2982 23.723L22.8879 15.4355C22.9915 13.9852 21.844 12.75 20.3857 12.75H20.4016Z"/>
  </svg>
  <span class="support-buddy-badge-text">Support Buddy</span>
</button>
<div class="support-buddy-badge-tooltip">More actions are available if you reveal the post, but remember you don't have to</div>
`;