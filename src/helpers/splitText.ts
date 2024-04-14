export function SplitText(text: string, maxTextLength: number) {
    if (text && text?.length) {
        return text.length > maxTextLength ? `${text.slice(0, maxTextLength)}...` : text
    }
    return ""
}
