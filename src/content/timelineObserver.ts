/**
 * Common observer pattern for watching Twitter timeline and processing article nodes.
 * Provides abstraction for different types of processing functions on article nodes.
 */

export type CellProcessor = (cell: HTMLElement) => void;

export interface TimelineObserverOptions {
    /**
     * Function to call when a new cell (cellInnerDiv) is added to the timeline
     */
    onCellAdded?: CellProcessor;
    
    /**
     * Function to call when navigation changes (e.g., URL change)
     */
    onNavigationChange?: () => void;
}

/**
 * Manages observers for Twitter timeline, watching for new article nodes
 * and providing a callback mechanism for processing them.
 */
export class TimelineObserver {
    private rootObserver: MutationObserver;
    private virtualScrollObserver: MutationObserver | null = null;
    private cellProcessor: CellProcessor;
    private navigationChangeHandler?: () => void;
    private lastHref: string = window.location.href;
    private isObserving: boolean = false;

    constructor(options: TimelineObserverOptions) {
        this.cellProcessor = options.onCellAdded || (() => {});
        this.navigationChangeHandler = options.onNavigationChange;
        
        this.rootObserver = new MutationObserver(() => {
            const container = this.findVirtualScrollContainer();
            if (container) {
                this.setupVirtualScrollObserver(container);
                this.processExistingCells(container);
                this.rootObserver.disconnect();
            }
        });

        this.start();
    }

    /**
     * Find the virtual scroll container (the div with position:relative inside timeline)
     */
    private findVirtualScrollContainer(): HTMLElement | null {
        const timeline = document.querySelector('div[aria-label^="Timeline:"]');
        if (!timeline) return null;

        // The virtual scroll container is the direct child div with position:relative
        const container = timeline.querySelector(':scope > div[style*="position: relative"]');
        return container as HTMLElement | null;
    }

    /**
     * Set up the observer for the virtual scroll container
     */
    private setupVirtualScrollObserver(container: HTMLElement): void {
        if (this.virtualScrollObserver) {
            this.virtualScrollObserver.disconnect();
        }

        this.virtualScrollObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement) {
                        this.cellProcessor(node);
                    }
                });
            });
        });

        // Observe only childList changes (when cellInnerDiv elements are added/removed)
        this.virtualScrollObserver.observe(container, {
            childList: true,  // Only watch for added/removed children
        });
    }

    /**
     * Process existing cells in the container
     */
    private processExistingCells(container: HTMLElement): void {
        const existingCells = container.querySelectorAll('div[data-testid="cellInnerDiv"]');
        existingCells.forEach(cell => {
            if (cell instanceof HTMLElement) {
                this.cellProcessor(cell);
            }
        });
    }

    /**
     * Start observing the timeline
     */
    public start(): void {
        if (this.isObserving) return;
        this.isObserving = true;

        // Try to find container immediately if DOM is already loaded
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            const container = this.findVirtualScrollContainer();
            if (container) {
                this.setupVirtualScrollObserver(container);
                this.processExistingCells(container);
            } else {
                // Container not found yet, start root observer
                this.rootObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        } else {
            // DOM not ready, start root observer
            this.rootObserver.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }

        // Set up navigation change handler if provided
        if (this.navigationChangeHandler) {
            window.addEventListener('click', this.handleNavigationChange.bind(this), true);
        }
    }

    /**
     * Stop observing the timeline
     */
    public stop(): void {
        if (!this.isObserving) return;
        this.isObserving = false;

        this.rootObserver.disconnect();
        if (this.virtualScrollObserver) {
            this.virtualScrollObserver.disconnect();
        }

        if (this.navigationChangeHandler) {
            window.removeEventListener('click', this.handleNavigationChange.bind(this), true);
        }
    }

    /**
     * Handle navigation changes (e.g., clicking on different columns)
     */
    private handleNavigationChange(): void {
        const currentHref = window.location.href;
        if (currentHref !== this.lastHref) {
            this.lastHref = currentHref;
            
            // Disconnect and restart observation
            this.rootObserver.disconnect();
            if (this.virtualScrollObserver) {
                this.virtualScrollObserver.disconnect();
            }
            
            this.rootObserver.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }
    }

    /**
     * Manually trigger processing of existing cells
     */
    public processExisting(): void {
        const container = this.findVirtualScrollContainer();
        if (container) {
            this.processExistingCells(container);
        }
    }
}
