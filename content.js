chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const entries = document.querySelectorAll(".-tagged-dropdown-and-search-filter-wrapper + div > div:not([style]) > :first-child");

  if (!entries.length) {
    sendResponse({ error: "No entries found." });
    return;
  }

  const content = Array.from(entries).reduce((prev, next) => {
    const description = next.querySelector("div:nth-child(1) > p").textContent
    const date = next.querySelector("div:nth-child(2) > :first-child > p").textContent
    const value = next.querySelector("div:nth-child(2) > :last-child > p").textContent

    return `${prev}\n${description}\t${date}\t${value}`;
  }, "Description\tDate\tValue")

  sendResponse({ message: content });
});
