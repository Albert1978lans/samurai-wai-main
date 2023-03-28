import s from './Users.module.css'
import {initialStateType} from "../../redux/users-reducer";
import {mapDispatchToPropsType} from "./Users.Container";
import axios from "axios";
import userPhoto from '../../assets/images/User.png'

type UsersPropsType = initialStateType & mapDispatchToPropsType

// props.setUsers([
//     {id: 1, imageUrl: urlActress, folloved: true, status: 'I am boss', fullName: 'Dimich K', location: {country: 'Belarus', city: 'Minsk'}},
//     {id: 2, imageUrl: urlActress, folloved: false, status: 'I am boss', fullName: 'Valera D', location: {country: 'Rasha', city: 'Moscow'}},
//     {id: 3, imageUrl: urlActress, folloved: false, status: 'I am boss', fullName: 'Sacha L', location: {country: 'Ukrane', city: 'Kiev'}},
// ])



export const Users = (props: UsersPropsType) => {

    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    props.setUsers(response.data.items)
                    console.log(response.data.items)
                })
        }
    }

    const changeFollow = (id: number, folloved: boolean) => {
        (folloved ? props.unFollow(id) : props.follow(id))
    }
    return (
        <>
            <button onClick={getUsers}>get users</button>
            {props.users.map((u) => {
                return(
                    <div key={u.id} className={s.wrapper}>
                        <div className={s.imageButton}>
                            <div className={s.foto}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt=""/>
                            </div>

                            <button onClick={()=>changeFollow(u.id, u.folloved)}>
                                {u.folloved ? 'UNFOLLOW' : 'FOLLOW'}
                            </button>
                        </div>
                        <div className={s.description}>
                            <div className={s.wrapper_name_status}>
                                <div className={s.name}>{u.name}</div>
                                <div className={s.status}>{u.status}</div>
                            </div>
                            <div className={s.location}>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}