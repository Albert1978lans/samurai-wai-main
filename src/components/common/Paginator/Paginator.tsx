import s from "./Paginator.module.css";
import React, {useEffect, useState} from "react";


type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    changeCurrentPage: (p: number) => void
}


export const Paginator = (props: PaginatorPropsType) => {

    const [rightBorder, setRightBorder] = useState(10)
    const [leftBorder, setLeftBorder] = useState(1)

    let pagesCount: number[] = []

    let count = Math.ceil(props.totalUsersCount / props.pageSize)


    for (let i = leftBorder; i <= rightBorder; i++) {
        pagesCount.push(i)
    }

    const setPaginatorBorder = (p: number) => {
        if (p > 4 && p <= count - 5) {
            setLeftBorder(p-4)
            setRightBorder(p+5)
        } else if (p < 4) {
            setLeftBorder(1)
            setRightBorder(10)
        } else if (p > count - 5) {
            setLeftBorder(count-10)
            setRightBorder(count)
        }

    }

    useEffect(() => {
        setPaginatorBorder(props.currentPage)
    })

    const paginator = pagesCount.map(p => {
        const finalSpanClass = s.pages + ' ' + (props.currentPage === p ? s.selected : '')
        return <span
            key={p}
            className={finalSpanClass}
            onClick={() => {
                props.changeCurrentPage(p)
                setPaginatorBorder(p)
            }}
        >
        {p}
            </span>
    })

    const buttonOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {

        if (e.currentTarget.name === 'start') {
            setLeftBorder(1)
            setRightBorder(10)
            props.changeCurrentPage(1)
        } else {
            setLeftBorder(count-10)
            setRightBorder(count)
            props.changeCurrentPage(count)
        }
    }


    return <div className={s.pgn}>
        <button name={'start'} onClick={buttonOnClick}>в начало списка</button>
        <div className={s.numbers}>
            <div className={s.paginator}>
                {leftBorder > 1 ? '...': ''}
                {paginator}
                {rightBorder < count ? '...': ''}
            </div>
        </div>
        <button name={'finish'} onClick={buttonOnClick}>в конец списка</button>
    </div>
}