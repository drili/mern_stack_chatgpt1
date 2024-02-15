function processHtmlContent(htmlContent, currentUserId) {
    console.log({htmlContent, currentUserId});
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const mentions = doc.querySelectorAll(".mention");

    mentions.forEach(mention => {
        const match = mention.className.match(/mention-user-([0-9a-f]+)/);
        if (match && match[1] === currentUserId) {
            mention.classList.add('mentionedCurrentUser');
        }
    });

    return doc.body.innerHTML;
}

export default processHtmlContent;
