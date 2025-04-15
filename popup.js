/**
 * @fileoverview Manages snippets using Chrome storage and displays them in a list.
 * Assumes existence of 'Sortable.js' library and 'date.format' function.
 * Assumes 'chrome.storage.sync' API is available.
 */

// --- Configuration & State ---

// Global state variable to hold snippets loaded from storage.
let snippetObject = [];
// Global variable to hold content data (e.g., student name, topic) - potentially loaded asynchronously.
let contentData = null;

// --- DOM Element Selectors ---

/**
 * Gets frequently used DOM elements.
 * @returns {object} An object containing the DOM elements.
 */
function getDOMElements() {
    return {
        listContainer: document.querySelector(".snips-inner"),
        mainSnipContainer: document.querySelector(".snips-main"), // Note: mainSnip is not used in the provided code after selection
        newSnippetTextarea: document.querySelector("#snips-textarea"),
        saveButton: document.querySelector("#snips-save-btn"),
        addHeadingButton: document.querySelector(".add-heading"),
        clearStorageButton: document.querySelector('#snips-clear-btn')
    };
}

// --- Core Logic Functions ---

/**
 * Renders the list of snippets in the DOM.
 * @param {Array<object>} snippets - The array of snippet objects to render.
 */
async function renderSnippetList(snippets) {
    console.log(`%c Building Snippet List`, 'color: teal');
    const { listContainer } = getDOMElements();
    if (!listContainer) return; // Exit if container not found

    listContainer.innerHTML = ""; // Clear existing list

    // Sort snippets by ID before rendering to ensure consistent order
    sortSnippetsById(snippets);

    // Create and append elements for each snippet
    snippets.forEach(snippetItem => {
        const snippetElement = createSnippetElement(snippetItem, snippets);
        listContainer.appendChild(snippetElement);
    });

    addBottomLine(); // Add visual separator at the end
    setupDragAndDrop(listContainer, snippets); // Re-initialize drag and drop
}

/**
 * Creates a DOM element for a single snippet.
 * @param {object} snippetItem - The snippet data object.
 * @param {Array<object>} allSnippets - The full array of snippets (used for deletion).
 * @returns {HTMLElement} The created snippet container element.
 */
function createSnippetElement(snippetItem, allSnippets) {
    const snipContainer = document.createElement("div");
    snipContainer.className = "snippet-container";
    // Store the date (used as ID) in the element for easier reference
    snipContainer.dataset.snippetId = snippetItem.date;

    // --- Heading ---
    const head = createSnippetHeading(snippetItem);
    snipContainer.appendChild(head);

    // --- Textarea ---
    const snipTextarea = createSnippetTextarea(snippetItem);
    snipContainer.appendChild(snipTextarea);

    // --- Buttons ---
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "snippet-buttons"; // Use a container for buttons

    const deleteButton = createDeleteButton(snippetItem, snipContainer, allSnippets);
    const copyButton = createCopyButton(snippetItem);
    const moveHandle = createMoveHandle();
    const hideButton = createHideButton(snippetItem);

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(moveHandle);
    buttonContainer.appendChild(hideButton);
    snipContainer.appendChild(buttonContainer);

    // --- Event Listeners for Textarea Focus/Blur ---
    setupTextareaFocusBlur(snipTextarea, buttonContainer, snippetItem);

    return snipContainer;
}

/**
 * Creates the heading element for a snippet.
 * @param {object} snippetItem - The snippet data object.
 * @returns {HTMLElement} The heading paragraph element.
 */
function createSnippetHeading(snippetItem) {
    const head = document.createElement("p");
    head.style.textAlign = "left";
    head.style.marginLeft = "10px";
    // Only add the heading if title data exists and is valid
    if (snippetItem.title && snippetItem.title.length > 0 && snippetItem.title[0].length >= 2) {
        const [titleText, titleColor] = snippetItem.title[0];
        head.innerHTML = `<b style='color:${titleColor || 'inherit'}'>${titleText || ''}</b>`;
    } else {
        head.innerHTML = ``; // Ensure it's empty if no title
    }
    return head;
}

/**
 * Creates the textarea element for a snippet.
 * @param {object} snippetItem - The snippet data object.
 * @returns {HTMLTextAreaElement} The textarea element.
 */
function createSnippetTextarea(snippetItem) {
    const snipTextarea = document.createElement("textarea");
    snipTextarea.className = "my-snippet";
    snipTextarea.cols = "50"; // Consider controlling size via CSS
    snipTextarea.setAttribute("contenteditable", "true"); // Redundant for textarea, but kept for consistency
    snipTextarea.value = snippetItem.text || ""; // Ensure value is always a string
    snipTextarea.style.fontFamily = snippetItem.hide ? "barcode" : "FiraCode"; // Use specific fonts
    snipTextarea.style.fontSize = snippetItem.hide ? "initial" : "inherit";

    // Initial auto-sizing
    autoSizeTextarea(snipTextarea);

    return snipTextarea;
}

/**
 * Adjusts textarea height based on content.
 * @param {HTMLTextAreaElement} textarea - The textarea element.
 */
function autoSizeTextarea(textarea) {
    // Simple auto-sizing based on scrollHeight
    textarea.style.height = 'auto'; // Temporarily shrink
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Set to content height

    // Alternative: Calculate rows based on content length (original logic)
    // const textLength = textarea.value.length;
    // const colWidth = 55; // Adjust this value based on font and desired width
    // const numRows = Math.max(1, Math.ceil(textLength / colWidth)); // Ensure at least 1 row
    // textarea.rows = numRows;
}


/**
 * Sets up focus and blur event listeners for a snippet textarea.
 * @param {HTMLTextAreaElement} snipTextarea - The snippet textarea element.
 * @param {HTMLElement} buttonContainer - The container holding the snippet's buttons.
 * @param {object} snippetItem - The snippet data object.
 */
function setupTextareaFocusBlur(snipTextarea, buttonContainer, snippetItem) {
    let originalValue = snipTextarea.value; // Store original value on focus

    snipTextarea.addEventListener("focus", () => {
        originalValue = snipTextarea.value; // Update original value in case it changed programmatically
        buttonContainer.classList.add("fade-snip-btn"); // Fade buttons
        snipTextarea.classList.add("my-snippet-overflow"); // Allow scrolling
    });

    snipTextarea.addEventListener("blur", async () => {
        buttonContainer.classList.remove("fade-snip-btn"); // Unfade buttons
        snipTextarea.classList.remove("my-snippet-overflow"); // Disable scrolling

        // Only update if the value actually changed
        if (snipTextarea.value !== originalValue) {
            console.log(`%c Updating Snippet`, 'color: blue', snippetItem.date);
            snippetItem.text = snipTextarea.value;
            await saveSnippetToStorage(snippetItem); // Save the single updated item
            // No full re-render needed here unless IDs/order change,
            // but keeping original behavior for now. If performance is an issue,
            // avoid the renderList call here.
            // await renderSnippetList(snippetObject); // Original code re-rendered here
        }
         // Re-adjust size after editing
        autoSizeTextarea(snipTextarea);
    });

     // Auto-size on input as well
    snipTextarea.addEventListener("input", () => {
        autoSizeTextarea(snipTextarea);
    });
}


/**
 * Creates the delete button for a snippet.
 * @param {object} snippetItem - The snippet data object.
 * @param {HTMLElement} snipContainer - The snippet's container element.
 * @param {Array<object>} allSnippets - The full array of snippets.
 * @returns {HTMLImageElement} The delete button element.
 */
function createDeleteButton(snippetItem, snipContainer, allSnippets) {
    const delButton = document.createElement("img");
    delButton.src = "./del.png"; // Consider using a more robust path or CSS background
    delButton.alt = "delete";
    delButton.title = "Double click to delete";
    delButton.className = "delete-snip snip-btn";

    delButton.addEventListener("dblclick", async () => {
        console.log(`%c Deleting Snippet`, 'color: red', snippetItem.date);
        snipContainer.classList.add("slide-out-left"); // Add animation class

        // Find index by date (unique identifier)
        const indexToRemove = allSnippets.findIndex(snip => snip.date === snippetItem.date);

        if (indexToRemove > -1) {
            allSnippets.splice(indexToRemove, 1); // Remove from the in-memory array

            // Update IDs for subsequent items if needed (depends on how IDs are used)
            // updateSnippetIds(allSnippets); // Uncomment if IDs must be sequential

            // Remove from storage
            await removeSnippetFromStorage(snippetItem.date);
        } else {
            console.warn("Snippet not found in array for deletion:", snippetItem.date);
        }


        // Delay removal from DOM for animation
        setTimeout(() => {
            snipContainer.remove();
             // Optional: Re-render if IDs were updated or absolute certainty is needed
            // renderSnippetList(allSnippets);
        }, 500); // Match animation duration
    });
    return delButton;
}

/**
 * Creates the copy button for a snippet.
 * @param {object} snippetItem - The snippet data object.
 * @returns {HTMLImageElement} The copy button element.
 */
function createCopyButton(snippetItem) {
    const copyButton = document.createElement("img");
    copyButton.className = "copy-snip snip-btn";
    copyButton.src = "./copy.png"; // Consider using a more robust path
    copyButton.alt = "copy";
    copyButton.title = "Copy";

    copyButton.addEventListener("click", async () => {
        copyButton.src = "./copyFill.png"; // Provide visual feedback

        let textToCopy = snippetItem.text;

        // Check if contentData exists and perform replacements
        if (contentData?.contentData?.names) {
            try {
                const { nameOnly, topic } = extractNameAndTopic(contentData.contentData.names);
                if (nameOnly) {
                    textToCopy = textToCopy.replaceAll("{name}", nameOnly);
                }
                if (topic) {
                    textToCopy = textToCopy.replaceAll("{topic}", topic);
                }
            } catch (error) {
                console.error("Error processing contentData for copy:", error);
                // Fallback to copying original text if processing fails
            }
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            console.log("Snippet copied to clipboard.");
            // Optionally reset the icon after a short delay
            setTimeout(() => {
                copyButton.src = "./copy.png";
            }, 1000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            // Optionally provide user feedback about the copy failure
            copyButton.src = "./copy.png"; // Reset icon on failure
        }
    });
    return copyButton;
}

/**
 * Extracts student's first name and topic from content data names array.
 * @param {Array<string>} names - Array of strings (e.g., ["Student: John Doe", "...", "Task - Subtask - Topic Name"]).
 * @returns {{nameOnly: string|null, topic: string|null}} Extracted name and topic.
 */
function extractNameAndTopic(names) {
    let nameOnly = null;
    let topic = null;

    // Extract name
    if (names[0]) {
        const trimmedName = names[0].replace("Student:", "").trim();
        nameOnly = trimmedName.split(" ")[0]; // Get first name
    }

    // Extract topic
    if (names[2]) {
        const taskString = names[2].trim();
        const parts = taskString.split('-');
        // Assumes topic is the last part after the first or second '-'
        if (parts.length > 2) { // e.g., "Task - Subtask - Topic"
            topic = parts.slice(2).join('-').trim().toLowerCase();
        } else if (parts.length > 1) { // e.g., "Task - Topic"
            topic = parts.slice(1).join('-').trim().toLowerCase();
        } else {
            topic = taskString.toLowerCase(); // Use the whole string if no '-'
        }
    }

    return { nameOnly, topic };
}


/**
 * Creates the move handle for a snippet.
 * @returns {HTMLImageElement} The move handle element.
 */
function createMoveHandle() {
    const moveHandle = document.createElement("img");
    moveHandle.src = "./up.png"; // Consider using a more robust path
    moveHandle.className = "move-snip snip-btn handle"; // 'handle' class for SortableJS
    moveHandle.alt = "move";
    moveHandle.title = "Move up/down (Drag)";
    return moveHandle;
}

/**
 * Creates the hide/show button for a snippet.
 * @param {object} snippetItem - The snippet data object.
 * @returns {HTMLImageElement} The hide/show button element.
 */
function createHideButton(snippetItem) {
    const hideButton = document.createElement("img");
    hideButton.className = "hide-snip snip-btn";
    hideButton.alt = "hide/show text";

    // Set initial state
    const updateButtonState = () => {
        hideButton.src = `./static/images/${snippetItem.hide ? "eye" : "invisible"}.png`;
        hideButton.title = snippetItem.hide ? "Show Text" : "Hide Text (Barcode)";
        // Find the corresponding textarea and update its style
        const snipContainer = hideButton.closest('.snippet-container');
        if (snipContainer) {
            const snipTextarea = snipContainer.querySelector('.my-snippet');
            if (snipTextarea) {
                snipTextarea.style.fontFamily = snippetItem.hide ? "barcode" : "FiraCode";
                snipTextarea.style.fontSize = snippetItem.hide ? "initial" : "inherit";
                autoSizeTextarea(snipTextarea); // Re-adjust size after font change
            }
        }
    };

    updateButtonState(); // Set initial image and title

    hideButton.addEventListener("click", async () => {
        console.log(`%c Toggling Hide/Show`, 'color: orange', snippetItem.date);
        snippetItem.hide = !snippetItem.hide; // Toggle the state
        await saveSnippetToStorage(snippetItem); // Save the updated state
        updateButtonState(); // Update button appearance and textarea style immediately
        // No full re-render needed, state is updated directly.
        // await renderSnippetList(snippetObject); // Original code re-rendered
    });

    return hideButton;
}


/**
 * Adds a visual line at the bottom of the snippet list.
 */
function addBottomLine() {
    // This function's original implementation was commented out.
    // Re-implement if a visual line is desired, e.g., using CSS border on the last item or the container.
    const { listContainer } = getDOMElements();
    if (listContainer && listContainer.lastElementChild) {
         // Example: Add a class to the last snippet container
         // listContainer.lastElementChild.classList.add("last-snippet");
         // Then style ".last-snippet" with CSS (e.g., border-bottom).
    }
     console.log("Bottom line function called (currently no visual effect).");
}

// --- Chrome Storage Interaction ---

/**
 * Saves a single snippet object to Chrome sync storage using its date as the key.
 * @param {object} snippet - The snippet object to save.
 */
async function saveSnippetToStorage(snippet) {
    if (!snippet || !snippet.date) {
        console.error("Invalid snippet object passed to saveSnippetToStorage:", snippet);
        return;
    }
    const key = snippet.date; // Use date as the unique key
    try {
        await chrome.storage.sync.set({ [key]: snippet });
        console.log(`%c Snippet Saved/Updated in Storage: ${key}`, 'color: #2196f3');
    } catch (error) {
        console.error(`Error saving snippet ${key} to storage:`, error);
        // Consider user feedback for storage errors
    }
}

/**
 * Loads all snippet data from Chrome sync storage.
 * Filters out non-snippet items (items without a 'date' property).
 */
async function loadSnippetsFromStorage() {
    console.log(`%c Getting Snippets from Storage`, 'color: #2196f3');
    try {
        const allItems = await chrome.storage.sync.get(null);
        const loadedSnippets = [];
        for (const key in allItems) {
            // Basic check to filter only snippet items (assuming 'date' is mandatory)
            if (allItems[key] && typeof allItems[key] === 'object' && allItems[key].hasOwnProperty('date')) {
                loadedSnippets.push(allItems[key]);
            } else {
                console.log("Ignoring non-snippet item from storage:", key);
            }
        }
        snippetObject = loadedSnippets; // Update the global state
        sortSnippetsById(snippetObject); // Ensure consistent order after loading
        console.log('Snippets loaded:', snippetObject);
        await renderSnippetList(snippetObject); // Render the loaded snippets
    } catch (error) {
        console.error("Error retrieving snippets from storage:", error);
        snippetObject = []; // Reset state on error
        await renderSnippetList(snippetObject); // Render empty list
    }
}

/**
 * Removes a single snippet from Chrome sync storage by its key (date).
 * @param {string} keyName - The key (date string) of the snippet to remove.
 */
async function removeSnippetFromStorage(keyName) {
    try {
        await chrome.storage.sync.remove(keyName);
        console.log(`%c Snippet Removed from Storage: ${keyName}`, 'color: #e91e63');
    } catch (error) {
        console.error(`Error removing snippet ${keyName} from storage:`, error);
    }
}

/**
 * Saves the entire current `snippetObject` array back to storage.
 * Useful after operations that change multiple items or their order (like drag/drop).
 * Each snippet is saved under its own 'date' key.
 */
async function saveAllSnippetsToStorage(snippets) {
    console.log(`%c Saving All Snippets to Storage after reorder`, 'color: #2196f3');
    const itemsToSave = {};
    snippets.forEach(item => {
        if (item && item.date) {
            itemsToSave[item.date] = item; // Prepare object for batch set
        }
    });

    try {
        await chrome.storage.sync.set(itemsToSave);
        console.log("All snippets saved successfully.");
        // Optionally re-render if needed, though usually called after drag/drop which might visually update already.
        // await renderSnippetList(snippets);
    } catch (error) {
        console.error("Error saving all snippets:", error);
    }
}

/**
 * Clears all items from Chrome sync storage.
 * USE WITH CAUTION.
 */
async function clearAllStorage() {
     console.warn(`%c Clearing ALL Chrome Sync Storage`, 'color: red; font-weight: bold;');
    try {
        await chrome.storage.sync.clear();
        snippetObject = []; // Clear in-memory array
        await renderSnippetList(snippetObject); // Render empty list
        // Clear related local storage if necessary
        localStorage.removeItem("snipInput");
        getDOMElements().newSnippetTextarea.value = "";
        console.log("Chrome sync storage cleared.");
    } catch (error) {
        console.error("Error clearing storage:", error);
    }
}


// --- Input Handling & New Snippets ---

/**
 * Sets up the event listener for the Save button to add new snippets.
 */
function setupSaveButtonListener() {
    const { newSnippetTextarea, saveButton } = getDOMElements();
    if (!newSnippetTextarea || !saveButton) return;

    saveButton.addEventListener("click", async () => {
        const inputText = newSnippetTextarea.value.trim();
        if (inputText === "") {
            console.log("Save button clicked, but textarea is empty.");
            return; // Do nothing if input is empty
        }

        const newSnippet = createSnippetObjectFromInput(inputText);

        // Add to the beginning of the in-memory array
        snippetObject.unshift(newSnippet);
        // Update IDs (optional, depends on usage)
        updateSnippetIds(snippetObject);

        // Save the new snippet to storage
        await saveSnippetToStorage(newSnippet);

        // Clear input field and reset height
        newSnippetTextarea.value = "";
        autoSizeTextarea(newSnippetTextarea);
        localStorage.removeItem("snipInput"); // Clear saved input

        // Re-render the entire list with the new item at the top
        await renderSnippetList(snippetObject);
    });
}

/**
 * Creates a new snippet object from the user's input text.
 * Parses optional heading syntax: <HeaderName, colorCode>
 * @param {string} inputText - The raw text from the input textarea.
 * @returns {object} The newly created snippet object.
 */
function createSnippetObjectFromInput(inputText) {
    let textOnly = inputText;
    let titleArray = [];
    const headingRegex = /^<([^,]+),\s*([^>]+)>\n?/i; // Matches <Heading, color> at the start, captures parts
    const match = inputText.match(headingRegex);

    if (match) {
        // Heading found: extract heading and text
        const headingName = match[1].trim();
        const headingColor = match[2].trim();
        // Check if heading already exists (optional, original logic was potentially buggy)
        // if (doesHeadingExist(headingName, snippetObject)) {
        //     alert("A snippet with this heading already exists!"); // Or handle differently
        //     // Consider returning null or throwing an error to prevent saving
        // }
        titleArray = [[headingName, headingColor]];
        textOnly = inputText.replace(headingRegex, "").trim(); // Remove heading and leading newline
    }

    // Use a reliable date formatting function (assuming date.format exists)
    const now = new Date();
    // Fallback if date.format is not available
    const currentDate = typeof date !== 'undefined' && typeof date.format === 'function'
        ? date.format(now, 'YYYY/MM/DD HH:mm:ss')
        : now.toISOString(); // Use ISO format as a fallback

    return {
        text: textOnly,
        title: titleArray,
        date: currentDate, // Unique timestamp used as ID
        id: 0, // Placeholder ID, will be updated by updateSnippetIds
        hide: false
    };
}

/**
 * Checks if a snippet with the given heading name already exists.
 * Note: Original function had a bug, returning too early.
 * @param {string} headingName - The heading name to check.
 * @param {Array<object>} snippets - The array of snippets to search within.
 * @returns {boolean} True if a snippet with that heading exists, false otherwise.
 */
function doesHeadingExist(headingName, snippets) {
    return snippets.some(snippet =>
        snippet.title && snippet.title.length > 0 && snippet.title[0][0] === headingName
    );
}


/**
 * Sets up the textarea to save input to local storage on input events
 * and load it on page load.
 */
function setupPersistentInput() {
    const { newSnippetTextarea } = getDOMElements();
    if (!newSnippetTextarea) return;

    // Load saved input on startup
    const savedInput = localStorage.getItem("snipInput");
    if (savedInput) {
        try {
            newSnippetTextarea.value = JSON.parse(savedInput);
            autoSizeTextarea(newSnippetTextarea); // Adjust size after loading
        } catch (e) {
            console.error("Error parsing saved input from localStorage:", e);
            localStorage.removeItem("snipInput"); // Clear invalid data
        }
    }

    // Save input to local storage whenever it changes
    newSnippetTextarea.addEventListener("input", () => {
        try {
            localStorage.setItem("snipInput", JSON.stringify(newSnippetTextarea.value));
        } catch (e) {
            console.error("Error saving input to localStorage:", e);
            // Could be due to storage limits
        }
         autoSizeTextarea(newSnippetTextarea); // Auto-size while typing
    });
}

/**
 * Sets up the button to insert heading syntax into the textarea.
 */
function setupAddHeadingButton() {
    const { newSnippetTextarea, addHeadingButton } = getDOMElements();
    if (!newSnippetTextarea || !addHeadingButton) return;

    addHeadingButton.addEventListener("click", () => {
        // Set value and place cursor after it for easier editing
        newSnippetTextarea.value = "<HeaderName, colorCode>\n";
        newSnippetTextarea.focus();
        // Move cursor to the end
        newSnippetTextarea.selectionStart = newSnippetTextarea.selectionEnd = newSnippetTextarea.value.length;
        autoSizeTextarea(newSnippetTextarea); // Adjust size
    });
}

/**
 * Sets up the clear all snippets button with confirmation.
 */
function setupClearButtonListener() {
    const { clearStorageButton } = getDOMElements();
    if (!clearStorageButton) return;

    // Change image on hover
    clearStorageButton.addEventListener('mouseover', () => {
        clearStorageButton.src = "./static/images/clean-hover.png";
    });
    clearStorageButton.addEventListener('mouseleave', () => {
        clearStorageButton.src = "./static/images/clean.png";
    });

    // Confirmation on click
    clearStorageButton.addEventListener('click', () => {
        const confirmation = confirm('🚨 Are you sure you want to clear all snippets? \n🚨 This action cannot be undone.');
        if (confirmation) {
            clearAllStorage();
        }
    });
}


// --- Utility Functions ---

/**
 * Sorts the snippet array in place based on the 'id' property (ascending).
 * @param {Array<object>} snippets - The array of snippets to sort.
 */
function sortSnippetsById(snippets) {
    snippets.sort((a, b) => (a.id || 0) - (b.id || 0)); // Handle potential missing IDs
}

/**
 * Updates the 'id' property of each snippet in the array to match its index.
 * Call this after adding, removing, or reordering snippets if sequential IDs are needed.
 * @param {Array<object>} snippets - The array of snippets to update.
 */
function updateSnippetIds(snippets) {
    snippets.forEach((item, index) => {
        item.id = index;
    });
    console.log("Snippet IDs updated to match array order.");
}

/**
 * Loads external content data (like student name/topic) from storage.
 * This data is used for placeholder replacement during copy actions.
 */
async function loadContentData() {
    try {
        // Assuming contentData is stored under the key 'contentData'
        const result = await chrome.storage.sync.get("contentData");
        if (result.contentData) {
            contentData = result; // Store the whole result object as it was used in original code
            console.log("Content data loaded:", contentData);
        } else {
            console.log("No content data found in storage.");
            contentData = null;
        }
    } catch (error) {
        console.error("Error loading content data:", error);
        contentData = null;
    }
}


// --- Drag and Drop Setup ---

/**
 * Initializes drag-and-drop functionality for the snippet list using SortableJS.
 * @param {HTMLElement} listElement - The container element whose children are sortable.
 * @param {Array<object>} snippets - The array of snippet objects managed by the list.
 */
function setupDragAndDrop(listElement, snippets) {
    // Ensure Sortable library is loaded
    if (typeof Sortable === 'undefined') {
        console.error("SortableJS library is not loaded.");
        return;
    }

    console.log("Initializing drag and drop on:", listElement);

    Sortable.create(listElement, {
        animation: 150, // Animation speed
        handle: ".handle", // Specify drag handle elements
        ghostClass: "sortable-ghost", // Class for the placeholder
        chosenClass: "sortable-chosen", // Class for the chosen item
        dragClass: "sortable-drag", // Class for the dragging item

        onEnd: async function (evt) {
            console.log(`%c Dragged item from index ${evt.oldIndex} to ${evt.newIndex}`, 'color: purple');

            // Update the in-memory array order
            const movedItem = snippets.splice(evt.oldIndex, 1)[0];
            snippets.splice(evt.newIndex, 0, movedItem);

            // Update the IDs to reflect the new order
            updateSnippetIds(snippets);

            // Save the entire reordered list with updated IDs back to storage
            await saveAllSnippetsToStorage(snippets);

            // Optional: Re-render if SortableJS doesn't perfectly update the DOM
            // or if IDs need to be reflected in data attributes immediately.
            // await renderSnippetList(snippets);
             console.log("Snippet order updated and saved.");
        },
    });
}


// --- Initialization ---

/**
 * Initializes the snippet manager application.
 */
async function initializeApp() {
    console.log("Initializing Snippet Manager...");
    setupAddHeadingButton();
    setupSaveButtonListener();
    setupClearButtonListener();
    setupPersistentInput(); // Load any previously typed unsaved input
    await loadContentData(); // Load external data needed for copy replacements
    await loadSnippetsFromStorage(); // Load snippets and render the initial list
    console.log("Snippet Manager Initialized.");
}

// --- Run Application ---

// Ensure the DOM is fully loaded before running the initialization logic
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOMContentLoaded has already fired
    initializeApp();
}
