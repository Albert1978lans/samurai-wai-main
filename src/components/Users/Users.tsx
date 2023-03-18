import s from './Users.module.css'
import {initialStateType, UserType} from "../../redux/users-reducer";
import {mapDispatchToPropsType} from "./Users.Container";

type UsersPropsType = initialStateType & mapDispatchToPropsType

export const Users = (props: UsersPropsType) => {

    const urlActress = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAbQvowIqss8KDb8fH2YcQ2JLKdwQBI16CcQ&usqp=CAU'

    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, imageUrl: urlActress, folloved: true, status: 'I am boss', fullName: 'Dimich K', location: {country: 'Belarus', city: 'Minsk'}},
            {id: 2, imageUrl: urlActress, folloved: false, status: 'I am boss', fullName: 'Valera D', location: {country: 'Rasha', city: 'Moscow'}},
            {id: 3, imageUrl: urlActress, folloved: false, status: 'I am boss', fullName: 'Sacha L', location: {country: 'Ukrane', city: 'Kiev'}},
        ])
    }

    const changeFollow = (id: number, folloved: boolean) => {
        (folloved ? props.unFollow(id) : props.follow(id))
    }

    return (
        <>
            {props.users.map((u) => {
                return(
                    <div key={u.id} className={s.wrapper}>
                        <div className={s.imageButton}>
                            <div className={s.foto}>
                                <img src={u.imageUrl} alt=""/>
                            </div>

                            <button onClick={()=>changeFollow(u.id, u.folloved)}>
                                {u.folloved ? 'UNFOLLOW' : 'FOLLOW'}
                            </button>
                        </div>
                        <div className={s.description}>
                            <div className={s.wrapper_name_status}>
                                <div className={s.name}>{u.fullName}</div>
                                <div className={s.status}>{u.status}</div>
                            </div>
                            <div className={s.location}>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}