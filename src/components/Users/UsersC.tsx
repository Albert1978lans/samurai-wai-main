import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/User.png";
import axios from "axios";
import {AppsStateType} from "../../redux/redux-store";
import {mapDispatchToPropsType} from "./Users.Container";
import {initialStateType} from "../../redux/users-reducer";


class UsersC extends React.Component<initialStateType & mapDispatchToPropsType> {

   componentDidMount() {
       axios.get("https://social-network.samuraijs.com/api/1.0/users")
           .then(response => {
               this.props.setUsers(response.data.items)
               console.log(response.data.items)
           })
   }


    changeFollow = (id: number, folloved: boolean) => {
        (folloved ? this.props.unFollow(id) : this.props.follow(id))
    }

    render() {
        return (
            <>
                {this.props.users.map((u) => {
                    return(
                        <div key={u.id} className={s.wrapper}>
                            <div className={s.imageButton}>
                                <div className={s.foto}>
                                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt=""/>
                                </div>

                                <button onClick={()=>this.changeFollow(u.id, u.folloved)}>
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
}

export default UsersC