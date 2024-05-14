import React, {ChangeEvent, useState} from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [editeMode, setEditeMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditeMode(true)
    }

    const deactivateEditMode = () => {
        setEditeMode(false)
        props.updateStatus(status)
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                {!editeMode &&
                    <span onDoubleClick={activateEditMode}>{props.status || '--hooks--'}</span>}
            </div>
            <div>
                {editeMode &&
                    <input
                        autoFocus
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={onChangeInput}
                    />}
            </div>
        </div>
    )


}

export default ProfileStatusWithHooks