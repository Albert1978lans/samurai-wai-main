import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {AppsStateType} from "../../redux/redux-store";
import {Redirect, withRouter} from "react-router-dom";
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

        this.props.getProfile(+userId)
    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type mapDispatchToPropsType = {
    getProfile: (userId: number) => void
}
type mapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
}

const mapStateToProps = (state: AppsStateType): mapStateToPropsType => {
    return {
        profile: state.profileState.profile,
        isAuth: state.auth.isAuth
    }
}



let withUrlDataComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getProfile})(withUrlDataComponent)