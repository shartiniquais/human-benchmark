// Function to simulate a natural click using mousedown, mouseup, and click events
// This is necessary because human benchmarks detects non-human like clicks
function nativeClick(element) {
    const rect = element.getBoundingClientRect();

    // Create events for each phase of the click
    const mouseDown = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        button: 0 // Left button
    });

    const mouseUp = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        button: 0
    });

    // Dispatch events in natural order
    element.dispatchEvent(mouseDown);
    element.dispatchEvent(mouseUp);
}

// Test clicking on the button after detection
function testClick(button) {
    console.log('[INFO] Attempting to click...');
    try {
        nativeClick(button);    // Simulated natural click using mouse events
    } catch (error) {
        console.error('[ERROR] Click failed:', error);
    }
}

// Mutation observer to detect color changefunction handleMutation(mutation, observer) {
function handleMutation(mutation, observer) {
    if (mutation.target.classList.contains('view-go')) {
        console.log('[SUCCESS] Change detected, clicking soon!');
        const button = document.querySelector('.view-go');

        if (!button) {
            console.error('[ERROR] Click button not found.');
            return;
        }
        
        testClick(button);
        observer.disconnect();
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => handleMutation(mutation, observer));
});

// Start observing mutations
const targetNode = document.querySelector('#root');
if (targetNode) {
    console.log('[INFO] Mutation observation started.');
    observer.observe(targetNode, { subtree: true, attributes: true, attributeFilter: ['class'] });
} else {
    console.error('[ERROR] Root element not found.');
}