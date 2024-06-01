import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from "../ProfileContainer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/User.png";
import ProfileDataReduxForm from "./ProfileDataForm";

type ProfileInfoType = {
    owner: boolean
    profile: ProfileType | undefined | null
    status: string
    updateStatus: (status: string) => void
    savePhotos: (photoFile: File) => void
    saveProfile: (formData: ProfileType) => Promise<string>
}

export type formDataProfileType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

const ProfileInfo = ({profile, status, updateStatus, owner, savePhotos, saveProfile}: ProfileInfoType) => {
    const [editeMode, setEditeMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhotos(e.target.files[0])

        }
    }

    const goToEditeMode = () => {
        setEditeMode(true)
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
            .then(() => setEditeMode(false))
    }

    return (
        <div className={s.content}>
            <div className={s.descriptionBlock}>
                <div className={s.img}>
                    <img alt={'userPhoto'} src={profile.photos.large || userPhoto}/>
                </div>
                <div>
                    {owner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>

                { editeMode
                    ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} owner={owner} goToEditeMode={goToEditeMode}/> }


                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    )
}
type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

type ProfileDataPropsType = {
    profile: ProfileType
    owner: boolean
    goToEditeMode: () => void
}

const ProfileData = ({profile, owner, goToEditeMode}: ProfileDataPropsType) => {
    return (
        <div>
            {owner && <div><button onClick={goToEditeMode}>edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>By professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>

)

}



export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo