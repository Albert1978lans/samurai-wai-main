import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getUserStatus, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";

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
        let userId: number | null = +this.props.match.params.userId

        if (!userId) {
            userId = this.props.authorizedUserId
        }

        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
                <Profile
                    {...this.props}
                    status={this.props.status}
                    profile={this.props.profile}
                    updateStatus={this.props.updateStatus}
                />
        )
    }
}

type mapDispatchToPropsType = {
    getProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
}
type mapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profile: state.profileState.profile,
        status: state.profileState.status,
        authorizedUserId: state.auth.userId
    }
}

export default compose<React.ComponentType>(
                    withAuthRedirect,
                    withRouter,
                    connect(mapStateToProps, {getProfile, getUserStatus, updateStatus})
                )(ProfileContainer)