
export const required = (values: string) => {
    if (values) return undefined
    return 'Field is required'
}

export const maxLengthCreators = (max: number) => (values: string) => {
    if (values && values.length > max) return `Max length ${max} symbols`
    return undefined
}

export const maxLength10 = maxLengthCreators(10)