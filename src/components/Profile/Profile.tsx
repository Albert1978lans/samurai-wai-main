import React from "react";
import s from './ProfileInfo.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfileStateType} from "../../redux/state";





type ProfilePropsType = {
    profileState: ProfileStateType,
    dispatch: (action: ActionsTypes)=>void
}

const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                stateMyPosts={props.profileState}
                dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile