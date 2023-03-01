import React from "react";
import s from './ProfileInfo.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfileStateType} from "../../redux/store";
import {StoreType} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";





type ProfilePropsType = {
    // profileState: ProfileStateType,
    // dispatch: (action: ActionsTypes)=>void
    store: StoreType
}

const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile