import s from "./Paginator.module.css";
import React from "react";


type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    changeCurrentPage: (p: number) => void
}


export const Paginator = (props: PaginatorPropsType) => {

    let pages: number[] = []

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const paginator = pages.map(p => {
        const finalSpanClass = s.pages + ' ' + (props.currentPage === p ? s.selected : '')
        return <span
            key={p}
            className={finalSpanClass}
            onClick={() => props.changeCurrentPage(p)}
        >
        {p}
            </span>
    })

    return <div>{paginator}</div>
}