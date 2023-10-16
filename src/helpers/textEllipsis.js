

function textEllipsis(text, maxChars) {
    if (text.length > maxChars) {
        return text.slice(0, maxChars) + '...'
    } else {
        return text
    }
}

export default textEllipsis;