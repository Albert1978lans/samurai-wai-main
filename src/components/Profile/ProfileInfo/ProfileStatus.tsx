import React, {ChangeEvent} from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        // console.log('componentDidUpdate')
        // let a = this.props.status
        // debugger
        if (this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        // console.log('render')
        return (
            <div>
                <div>
                    { !this.state.editMode &&
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '----'}</span> }
                </div>
                <div>
                    { this.state.editMode &&
                    <input
                        autoFocus
                        onBlur={this.deactivateEditMode}
                        value={this.state.status}
                        onChange={this.onChangeInput}
                    /> }
                </div>
            </div>
        )
    }


}

export default ProfileStatus