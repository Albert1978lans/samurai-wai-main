import React from "react";
import {Contact} from "./ProfileInfo";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileDataForm.module.css'
import {ProfileType} from "../../../types/types";


type ProfileDataFormProps = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormProps> & ProfileDataFormProps>  = (props ) => {
    const { pristine, submitting, reset, handleSubmit, initialValues, profile } = props

    return (
        <form onSubmit={handleSubmit}>
            <button type={'submit'}>save</button>
            <div className={s.field}>
                <b>Full name:  </b> {createField('Full name', 'fullName', [], Input)}
            </div>
            <div className={s.field}>
                <b>Looking for a job:  </b>
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div className={s.field}>
                <b>My professional skills: </b>
                {createField('My professional skills', 'lookingForAJobDescription', [], Input)}
            </div>
            <div className={s.field}>
                <b>About me:</b>
                {createField('About me', 'aboutMe', [], Input)}
            </div>
            <div>

                <b>Contacts</b>:
                {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}: {createField(key, 'contacts.' + key, [], Input, {type: 'text'})}</b>
                    </div>
            })}


                {props.error && <div className={s.formSummaryError}>{props.error}</div>}
            </div>

        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormProps>({
    form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataReduxForm

