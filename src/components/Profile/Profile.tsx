import React from "react";
import s from './ProfileInfo.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerType} from "./ProfileContainer";

type ProfilePropsType = ProfileContainerType

const Profile = (props: ProfilePropsType) => {

    return (

        <div className={s.content}>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile