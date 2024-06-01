import React from "react";
import s from './ProfileInfo.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerType} from "./ProfileContainer";

type ProfilePropsType = ProfileContainerType & {owner: boolean}

const Profile = (props: ProfilePropsType) => {

    return (

        <div className={s.content}>
            <ProfileInfo
                owner={props.owner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhotos={props.savePhotos}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile