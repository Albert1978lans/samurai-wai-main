import React from "react";

type ProfileStatusType = {
    title: string
}
class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                <div>
                    { !this.state.editMode &&
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.title}</span> }
                </div>
                <div>
                    { this.state.editMode &&
                    <input autoFocus onBlur={this.deactivateEditMode.bind(this)} value={this.props.title}/> }
                </div>
            </div>
        )
    }


}

export default ProfileStatus