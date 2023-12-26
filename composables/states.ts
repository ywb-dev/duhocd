export const useActive = () => useState<boolean>('active', () => {
    return false
})

export const useImageUpload = () => useState<string>('imageUpload', () => {
    return ''
})

