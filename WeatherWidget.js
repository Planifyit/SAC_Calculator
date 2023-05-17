(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<p id="blog-snippet">Loading...</p>`;   
   
    class SAPBlogPostSnippet extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._snippetElement = this._shadowRoot.querySelector('#blog-snippet');
            this.fetchBlogPostSnippet();
        }

        fetchBlogPostSnippet() {
            // The URL of the blog post
            const postUrl = 'https://blogs.sap.com/2023/05/17/whats-new-in-sap-analytics-cloud-release-2023.10/';

            // Use a CORS proxy to make the request
            const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

            // Use the fetch API to request the HTML of the blog post
            fetch(corsProxyUrl + postUrl)
                .then(response => response.text())
                .then(html => {
                    // Use a DOMParser to parse the HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Extract the first paragraph of the blog post
                    const firstParagraph = doc.querySelector('.content-section p');

                    // Display the first paragraph in the custom widget
                    this._snippetElement.textContent = firstParagraph.textContent;
                })
                .catch(err => {
                    console.error('Failed to load blog post:', err);
                    this._snippetElement.textContent = 'Failed to load blog post.';
                });
        }
    }

    customElements.define('sap-blog-post-snippet', SAPBlogPostSnippet);
})();
