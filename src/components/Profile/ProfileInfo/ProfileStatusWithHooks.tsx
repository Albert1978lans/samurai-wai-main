import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [editeMode, setEditeMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

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
                    <div>
                        <b>Status: </b>
                        <span onDoubleClick={activateEditMode}>{props.status || '--hooks--'}</span>
                    </div>

                    }
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