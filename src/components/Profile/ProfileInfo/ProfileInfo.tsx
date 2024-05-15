import React from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from "../ProfileContainer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = ({profile, status, updateStatus}:ProfileInfoType) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={s.content}>
            <div className={s.descriptionBlock}>
                <div className={s.img}>
                    <img alt={'userPhoto'} src={profile.photos.small} />
                </div>

                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    )
}

export default ProfileInfo