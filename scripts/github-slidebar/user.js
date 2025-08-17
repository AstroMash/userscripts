// ==UserScript==
// @name         SlideBar - GitHub PR Sidebar Enhancer
// @namespace    https://github.com/AstroMash/userscripts
// @version      0.3.0
// @description  Pop the trunc on 'em - Make the PR sidebar not suck so much (resize, scroll, etc)
// @author       AstroMash
// @icon         https://raw.githubusercontent.com/astromash/userscripts/main/scripts/github-slidebar/icon.png
// @match        https://github.com/*/pull/*
// @match        https://github.com/*/pulls/*
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/astromash/userscripts/main/scripts/github-slidebar/user.js
// @updateURL    https://raw.githubusercontent.com/astromash/userscripts/main/scripts/github-slidebar/meta.js
// ==/UserScript==

(function () {
    'use strict';

    const defaultConfig = {
        enableResizing: true,
        enableTooltips: true,
        enableHorizontalScroll: false,
        sidebarWidth: 300,
    };

    let config = GM_getValue('slidebarConfig', defaultConfig);

    window.addEventListener('load', function () {
        init();
    });

    function init() {
        const diffLayout = document.getElementById('diff-layout-component');
        if (!diffLayout) {
            log('diff-layout-component not found, trying again in 1 second');
            setTimeout(init, 1000);
            return;
        }

        const sidebarContainer = diffLayout.querySelector(
            '[data-target="diff-layout.sidebarContainer"]'
        );
        const mainContainer = diffLayout.querySelector(
            '[data-target="diff-layout.mainContainer"]'
        );

        if (!sidebarContainer || !mainContainer) {
            log(
                'sidebar or main container not found, trying again in 1 second'
            );
            setTimeout(init, 1000);
            return;
        }

        addConfigInterface(sidebarContainer);
        applySidebarWidth(sidebarContainer, config.sidebarWidth);

        if (config.enableResizing) {
            addResizeHandle(diffLayout, sidebarContainer, mainContainer);
        }
        if (config.enableTooltips) {
            addTooltips(sidebarContainer);
        }
        if (config.enableHorizontalScroll) {
            addHorizontalScroll(sidebarContainer);
        }

        log(`SlideBar initialized with config: ${JSON.stringify(config)}`);
        observeForChanges(sidebarContainer);
    }

    function applySidebarWidth(sidebarContainer, width) {
        if (typeof width !== 'number' || width < 200) {
            log('Invalid width, using default 300px');
            width = 300;
        }
        sidebarContainer.style = {
            ...sidebarContainer.style,
            width: `${width}px`,
            minWidth: `${width}px`,
            flexBasis: `${width}px`,
        };
        // sidebarContainer.style.width = `${width}px`;
        // sidebarContainer.style.minWidth = `${width}px`;
        // sidebarContainer.style.flexBasis = `${width}px`;
        logWithDebounce(`Sidebar width set to ${width}px`, 1000);
    }

    function log(message) {
        console.log('SlideBar:', message);
    }

    function logWithDebounce(message, delay) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                log(message);
            }, delay);
        };
    }

    function addResizeHandle(diffLayout, sidebarContainer, mainContainer) {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'ghsb-resize-handle';
        resizeHandle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 100%;
            cursor: col-resize;
            z-index: 100;
            background: transparent;
        `;

        updateHandlePosition(resizeHandle, sidebarContainer);

        diffLayout.style.position = 'relative';
        diffLayout.appendChild(resizeHandle);

        // Set up drag functionality
        let startX, startWidth;

        resizeHandle.addEventListener('mousedown', function (e) {
            startX = e.clientX;
            startWidth = parseInt(
                document.defaultView.getComputedStyle(sidebarContainer).width,
                10
            );
            document.documentElement.addEventListener('mousemove', resizeMove);
            document.documentElement.addEventListener('mouseup', resizeEnd);
            e.preventDefault();
        });

        function resizeMove(e) {
            // Only proceed if the left mouse button (and nothing else) is pressed
            if (e.buttons !== 1) {
                resizeEnd();
                return;
            }
            const newWidth = Math.max(200, startWidth + (e.clientX - startX));
            applySidebarWidth(sidebarContainer, newWidth);
            updateHandlePosition(resizeHandle, sidebarContainer);
            config.sidebarWidth = newWidth; // This gets persisted later in resizeEnd
        }

        function resizeEnd() {
            document.documentElement.removeEventListener(
                'mousemove',
                resizeMove
            );
            document.documentElement.removeEventListener('mouseup', resizeEnd);
            GM_setValue('slidebarConfig', config);
        }
    }

    function updateHandlePosition(handle, sidebarContainer) {
        handle.style.left = `${
            sidebarContainer.getBoundingClientRect().width
        }px`;
    }

    function addTooltips(sidebarContainer) {
        log('Adding tooltips to truncated items...');
        // Find all truncated elements
        const truncatedElements = sidebarContainer.querySelectorAll(
            '.ActionList-item-label--truncate'
        );
        log(`Found ${truncatedElements.length} truncated items`);
        truncatedElements.forEach((element) => {
            // Only add title attribute if the text is truncated
            if (element.scrollWidth > element.clientWidth) {
                // Get the full text content
                const fullText = element.textContent.trim();
                element.setAttribute('title', fullText);
                log(`Added tooltip to: ${fullText}`);
            }
        });
    }

    function addHorizontalScroll(sidebarContainer) {
        const truncatedElements = sidebarContainer.querySelectorAll(
            '.ActionList-item-label--truncate'
        );

        truncatedElements.forEach((element) => {
            // Override truncation styles
            element.style.whiteSpace = 'pre';
            element.style.overflow = 'auto';
            element.style.textOverflow = 'initial';

            // Prevent scrollbars when not needed
            if (element.scrollWidth <= element.clientWidth) {
                element.style.overflowX = 'hidden';
            }
        });
    }

    function observeForChanges(sidebarContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // If new nodes are added
                if (mutation.type === 'childList') {
                    if (config.enableTooltips) {
                        addTooltips(sidebarContainer);
                    }
                    if (config.enableHorizontalScroll) {
                        addHorizontalScroll(sidebarContainer);
                    }
                }
            });
        });

        observer.observe(sidebarContainer, { childList: true, subtree: true });
    }

    function addConfigInterface(sidebarContainer) {
        const filterBar = sidebarContainer.querySelector('.SelectMenu-filter');
        if (!filterBar) return;

        const configButton = document.createElement('button');
        configButton.className = 'sidebar-enhancer-config-btn';
        configButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.003.108.036.137.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046.219.31.41.641.573.989.014.031.022.11-.059.19l-.815.806c-.411.406-.562.957-.53 1.456a4.588 4.588 0 010 .582c-.032.499.119 1.05.53 1.456l.815.806c.08.08.073.159.059.19a6.494 6.494 0 01-.573.99c-.02.029-.086.074-.195.045l-1.103-.303c-.559-.153-1.112-.008-1.529.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029.11-.101.143-.137.146a6.613 6.613 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.502 4.502 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a6.492 6.492 0 01-.573-.989c-.014-.031-.022-.11.059-.19l.815-.806c.411-.406.562-.957.53-1.456a4.587 4.587 0 010-.582c.032-.499-.119-1.05-.53-1.456l-.815-.806c-.08-.08-.073-.159-.059-.19a6.44 6.44 0 01.573-.99c.02-.029.086-.075.195-.045l1.103.303c.559.153 1.112.008 1.529-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.101-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.09-.3.071L3.27 2.776c-.644-.177-1.392.02-1.82.63a7.977 7.977 0 00-.704 1.217c-.315.675-.111 1.422.363 1.891l.815.806c.05.048.098.147.088.294a6.084 6.084 0 000 .772c.01.147-.038.246-.088.294l-.815.806c-.474.469-.678 1.216-.363 1.891.2.428.436.835.704 1.218.428.609 1.176.806 1.82.63l1.103-.303c.066-.019.176-.011.299.071.213.143.436.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a5.98 5.98 0 00.668-.386c.123-.082.233-.09.3-.071l1.102.302c.644.177 1.392-.02 1.82-.63.268-.382.505-.789.704-1.217.315-.675.111-1.422-.364-1.891l-.814-.806c-.05-.048-.098-.147-.088-.294a6.1 6.1 0 000-.772c-.01-.147.039-.246.088-.294l.814-.806c.475-.469.679-1.216.364-1.891a7.992 7.992 0 00-.704-1.218c-.428-.609-1.176-.806-1.82-.63l-1.103.303c-.066.019-.176.011-.299-.071a5.991 5.991 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L10.16 1.29C9.99.645 9.444.095 8.701.031A8.094 8.094 0 008 0zm1.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 8a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
        configButton.style.cssText = `
            background: none;
            border: none;
            padding: 5px;
            cursor: pointer;
            color: #6e7781;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        `;
        filterBar.style.position = 'relative';
        filterBar.appendChild(configButton);
        configButton.addEventListener('click', showConfigModal);
    }

    function showConfigModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'sidebar-enhancer-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'sidebar-enhancer-modal';
        modal.style.cssText = `
            background: white;
            border-radius: 6px;
            padding: 20px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        modal.innerHTML = `
            <h3 style="margin-top: 0; border-bottom: 1px solid #e1e4e8; padding-bottom: 10px;">
                Slidebar Settings
            </h3>
            <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="enableResizing" ${
                        config.enableResizing ? 'checked' : ''
                    }>
                    <span style="margin-left: 8px;">Enable Sidebar Resizing</span>
                </label>
                <label style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="enableTooltips" ${
                        config.enableTooltips ? 'checked' : ''
                    }>
                    <span style="margin-left: 8px;">Show Tooltips on Truncated Items</span>
                </label>
                <label style="display: flex; align-items: center; margin-bottom: 15px;">
                    <input type="checkbox" id="enableHorizontalScroll" ${
                        config.enableHorizontalScroll ? 'checked' : ''
                    }>
                    <span style="margin-left: 8px;">Enable Horizontal Scrolling</span>
                </label>
                <label style="display: block; margin-bottom: 10px;">
                    <span>Sidebar Width:</span>
                    <input type="number" id="sidebarWidth" value="${
                        config.sidebarWidth
                    }" style="width: 80px; margin-left: 8px;">px
                </label>
            </div>
            <div style="display: flex; justify-content: flex-end; border-top: 1px solid #e1e4e8; padding-top: 15px;">
                <button id="cancelConfig" style="margin-right: 10px; padding: 5px 12px; background: #f6f8fa; border: 1px solid rgba(27, 31, 36, 0.15); border-radius: 6px; cursor: pointer;">
                    Cancel
                </button>
                <button id="saveConfig" style="padding: 5px 12px; background: #2da44e; color: white; border: 1px solid rgba(27, 31, 36, 0.15); border-radius: 6px; cursor: pointer;">
                    Save
                </button>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        document
            .getElementById('cancelConfig')
            .addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });

        document.getElementById('saveConfig').addEventListener('click', () => {
            config.enableResizing =
                document.getElementById('enableResizing').checked;
            config.enableTooltips =
                document.getElementById('enableTooltips').checked;
            config.enableHorizontalScroll = document.getElementById(
                'enableHorizontalScroll'
            ).checked;
            config.sidebarWidth = parseInt(
                document.getElementById('sidebarWidth').value,
                10
            );

            GM_setValue('slidebarConfig', config);
            document.body.removeChild(modalOverlay);
            window.location.reload();
        });
    }
})();
