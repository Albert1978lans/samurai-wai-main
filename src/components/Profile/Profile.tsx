import React from "react";
import s from './ProfileInfo.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileStateType} from "../../index";





type ProfilePropsType = {
    profileState: ProfileStateType
}

const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profileState.posts}/>
        </div>
    )
}

export default Profile