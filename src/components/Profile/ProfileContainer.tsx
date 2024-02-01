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
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = '28504'
        }

        this.props.getProfile(+userId)
        this.props.getUserStatus(+userId)
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
    getProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
type mapStateToPropsType = {
    profile: ProfileType
    status: string
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profile: state.profileState.profile,
        status: state.profileState.status
    }
}

export default compose<React.ComponentType>(
                    withAuthRedirect,
                    withRouter,
                    connect(mapStateToProps, {getProfile, getUserStatus, updateStatus})
                )(ProfileContainer)