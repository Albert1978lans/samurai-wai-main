import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppsStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

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

type PathParamsType = {
    userId: string
}

type WithRouterType = RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType & WithRouterType>  {



    componentDidMount() {


        let userId = this.props.match.params.userId

        if (!userId) {
            userId = '2'
        }

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        console.log(this.props)
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



let withUrlDataComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(withUrlDataComponent)