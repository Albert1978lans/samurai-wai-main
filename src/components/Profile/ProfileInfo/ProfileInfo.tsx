import React from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from "../ProfileContainer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}



const ProfileInfo = (props: ProfileInfoType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.content}>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVI0Cqa5bYHtHDE5-fVDxVeGtZV6anu8qVzw&usqp=CAU" alt="image"/>
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.img}>
                    <img src={props.profile.photos.small} />
                </div>

                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
        </div>
    )
}

export default ProfileInfo