document.querySelector(".filter-form").addEventListener("submit", event => {
  event.preventDefault();

  const content = document.querySelector(".content");
  content.innerHTML = "";

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {}, response => {
          if (!response) {
            content.innerHTML = "Something wrong happened.. You should be on Flash site.";
            return;
          }

          if (response.error) {
            content.innerHTML = response.error;
            return;
          }

          navigator.clipboard.writeText(response.message);
          content.innerHTML = "Account statement successfully copied!";
      });
  });
});
