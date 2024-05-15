
export const updateObjectInArrayMy = (items: Array<any>, searchId: number, changedPropsObj: object) => {
    return items.map(item => {
        if (item.id === searchId) {
            return {...item, ...changedPropsObj}
        }
        return  item
    })
}

export const updateObjectInArrayD = (items: Array<any>, searchId: number,
                                    objPropName: any, newObjProps: object) => {
    return items.map(u => {
        if (u[objPropName] === searchId) {
            return {...u, ...newObjProps}
        }
        return  u
    })
}

