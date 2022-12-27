import React from "react";
import s from './ProfileInfo.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileStateType} from "../../redux/state";





type ProfilePropsType = {
    profileState: ProfileStateType,
    addPost: ()=>void,
    changeTextarea: (text: string) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                stateMyPosts={props.profileState}
                addPost={props.addPost}
                changeTextarea={props.changeTextarea}
            />
        </div>
    )
}

export default Profile