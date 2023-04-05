import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppsStateType} from "../../redux/redux-store";

export type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: object
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
    photos: {
        small: string
        large: string
    }
}

class ProfileContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType>  {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
type mapStateToPropsType = {
    profile: ProfileType
}

const mapStateToProps = (state: AppsStateType): mapStateToPropsType => {
    return {
        profile: state.profileState.profile
    }

}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)