import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getUserStatus, updateStatus, savePhotos, saveProfile} from "../../redux/profile-reducer";
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
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    aboutMe: string
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

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }


    componentDidMount() {
        // debugger
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<mapStateToPropsType & mapDispatchToPropsType & WithRouterType>, prevState: Readonly<{}>, snapshot?: any) {

        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
                <Profile
                    {...this.props}
                    owner={! this.props.match.params.userId}
                    status={this.props.status}
                    profile={this.props.profile}
                    updateStatus={this.props.updateStatus}
                    saveProfile={this.props.saveProfile}
                />
        )
    }
}

type mapDispatchToPropsType = {
    getProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhotos: (photoFile: File) => void
    saveProfile: (formData: ProfileType) => Promise<string>
}
type mapStateToPropsType = {
    profile: ProfileType | undefined | null
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
                    connect(mapStateToProps,
                        {getProfile, getUserStatus, updateStatus, savePhotos, saveProfile})
                )(ProfileContainer)