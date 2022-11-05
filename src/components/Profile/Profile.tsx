import React from "react";
import s from './ProfileInfo.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileStateType} from "../../redux/state";





type ProfilePropsType = {
    profileState: ProfileStateType,
    addPost: (text: string)=>void
}

const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profileState.posts} addPost={props.addPost}/>
        </div>
    )
}

export default Profile