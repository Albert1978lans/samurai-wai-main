import React, { Suspense } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";



import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";

// import UsersContainer from "./components/Users/Users.Container";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/Users.Container'));


class App extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <div style={{width: '100%', height: '500px', textAlign: 'center'}}><Preloader/></div>
        }

        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path={'/profile/:userId?'}  render={() => {
                            return <Suspense fallback={<Preloader/>}>
                                <ProfileContainer/>
                            </Suspense>
                        }}/>
                        <Route path={'/dialogs'} render={() => {
                            return <Suspense fallback={<Preloader/>}>
                                <DialogsContainer/>
                            </Suspense>
                        }}/>
                        <Route path={'/users'} render={() => {
                            return <Suspense fallback={<Preloader/>}>
                                <UsersContainer/>
                            </Suspense>
                        }}/>
                        <Route path={'/login'} render={() => <LoginPage/>}/>
                        <Route path={'/news'} component={News}/>
                        <Route path={'/music'} component={Music}/>
                        <Route path={'/settings'} component={Settings}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

type mapStateToPropsType = {
    initialized: boolean
}
type mapDispatchToPropsType = {
    initializeApp: () => void
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default  compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}),
)(App) ;

