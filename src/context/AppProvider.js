import React, { Component, useState, useReducer, useContext } from 'react';
import AppContext from './AppContext';
import Auth from '../utils/auth';

import * as ACTIONS from '../store/actions/actions';

import * as AuthReducer from '../store/reducers/auth_reducer';

import * as NavToggleReducer from '../store/reducers/toggle_reducer'

import * as UsersProfileReducer from '../store/reducers/profile_reducer';
import Profile from '../students/Profile';
import AssignmentCards from '../students/profilePages/assignmentCards';
import StudentExam from '../students/exam'; 
import StudentTest from '../students/test'; 

const auth = new Auth()

const AppProvider = (props) =>  {
    const states = {
        home: {
            profile: { header: 'Profile Header', content: <div>{ <Profile /> }</div> }, 

            assignment: { header: 'Assignment Header', content: <div><AssignmentCards /></div> },

            test: { header: 'Test Header', content: <div><StudentTest /></div> },

            exam: { header: 'Exam Header', content: <div><StudentExam /></div> },

            activeTab: true, // Default Active Table

            sub: false

        },

        video: {
            classes: { header: 'classes Header', content: "classes Here" },
            liveClasses: { header: 'liveClasses Header', content: "liveClasses Here" },
            activeTab: false,
            sub: false
        },

        chat: {
            teachers:{ 
                generalSchoolGroup:{ header: 'generalSchoolGroup Header', content: "generalSchoolGroup Here" }, 
                classGroup: { header: 'classGroup Header', content: "classGroup Here" }, 
                pta: { header: 'PTA Header', content: "PTA Here" },
                duo: { header: 'DUO Header', content: "duo Here" }, 
                groupChat:{ header: 'groupChat Header', content: "groupChat Here" },
            },
            parent: { 
                pta: { header: 'pta Header', content: "pta Here" },
                duo: { header: 'Profile Header', content: "Profile Here" },
                groupChat: { header: 'groupChat Header', content: "groupChat Here" },
            },
            student: { 
                generalSchoolGroup: { header: 'generalSchoolGroup Header', content: "generalSchoolGroup Here" },
                classGroup: { header: 'classGroup Header', content: "classGroup Here" },
                duo: { header: 'duo Header', content: "duo Here" },
                groupChat: { header: 'Profile Header', content: "Profile Here" },
            },
            schoolAdmin: { 
                generalSchoolGroup: { header: 'Profile Header', content: "generalSchoolGroup Here" },
                classGroup: { header: 'classGroup Header', content: "classGroup Here" },
                pta: { header: 'pta Header', content: "pta Here" },
                duo: { header: 'duo Header', content: "duo Here" },
                groupChat: { header: 'groupChat Header', content: "groupChat Here" },
            },            
            activeTab: false,
            sub: true,
            
        },
        statistics: {
            timetable: [], 
            result: [],
            activeTab: false,
            sub: false
        },
        currentTab: "home",
        activeSubTab: "profile",
        menuKeySelected:'home',
        subMenuKeySelected:'home&profile'

    }

    const [state, setState] = useState(states)
    
    // const [state, setDashboardState ] = useState(state);




    const subMenuKeySelected = state.subMenuKeySelected;

    //const tabKeys = (currentTab)=>Object.keys(state[currentTab]);
    // const videoKeys = Object.keys(state.video);
    // const chatKeys = Object.keys(state.home);
    // const statisticsKeys = Object.keys(state.home);

    /*
      Auth Reducer
    */
   // [stateAuthReducer, dispatchAuthReducer]

    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState)

    const handleLogin = () => { dispatchAuthReducer(ACTIONS.login_success()) }

    const handleLogout = () => {
            dispatchAuthReducer(ACTIONS.login_failure())
        }

    const handleAddProfile = (profile) => {
            dispatchAuthReducer(ACTIONS.add_profile(profile))
        }

    const handleRemoveProfile = () => {
            dispatchAuthReducer(ACTIONS.remove_profile())
        }
        
    /*
      Profile List Reducer 
    */ 

   const profileListReducer = useReducer(UsersProfileReducer.ProfileListReducer, UsersProfileReducer.initialState)

   const stateProfileListReducer = profileListReducer[0];   //@ts-ignore

   const dispatchProfileListReducer  = profileListReducer[1];    //@ts-ignore

   const handlePopulateProfileList = (profileList) => {

        dispatchProfileListReducer(ACTIONS.populate_profile_list(profileList))
 
    }

    const handleRemoveProfileUser = (profile) => {

        dispatchProfileListReducer(ACTIONS.remove_profile_user(profile))

    }

    const handleUpdateProfileUser = (profile) => {

        dispatchProfileListReducer(ACTIONS.update_profile_user(profile))

    }

    const [stateNavToggleReducer, dispatchNavToggleReducer] = useReducer(NavToggleReducer.NavToggleReducer, NavToggleReducer.initialState)

    const handleNavToggleReducer = (collapsed, visible) => {

        dispatchNavToggleReducer(ACTIONS.toggle_collapsed(collapsed, visible))

    }

    //Handle authentication from callback
    const handleAuthentication = () => {
    
        auth.populateProfileList(props)

    }
      
    // console.log("state.currentTab", state.currentTab, state[state.currentTab]);
        return (
            <AppContext.Provider
                value={{
                    home: state.home,
                    video: state.video,
                    chat: state.chat,
                    statistics: state.chat,
                    dashboardState: state,
                    setDashboardState: (state)=>setState(state),
                    
                    openMenuHome: (e) =>{
                        // e.preventDefault();
                        console.log(e.key)
                        const tab = state.currentTab
                        setState({...state, currentTab:"home", subMenuKeySelected: 'home&profile', home:{...state.home, activeTab: true},  [tab]:{...state[tab], activeTab: false}})
                    },
                
                    openMenuVideo: (e)=>{
                        // e.preventDefault();
                        console.log(e.key)
                        const tab = state.currentTab
                        setState({...state, currentTab:"video", subMenuKeySelected: 'video&classes', video:{...state.video, activeTab: true}, [tab]:{...state[tab], activeTab: false}})
                    },
                

                    showContentClick: (e)=>{
                        const [tab, subTab] = e.key.split("&");
                        console.log(e.key, tab, subTab);
                        setState({...state, currentTab: `${tab}`, activeSubTab: `${subTab}`})
                    },
                
                    openMenuChat:(e)=>{
                        // e.preventDefault();
                        //console.log(e.key)
                        const tab = state.currentTab
                        setState({...state, currentTab:"chat", subMenuKeySelected: 'chat&teachers', chat:{...state.chat, activeTab: true}, [tab]:{...state[tab], activeTab: false}})
                    },

                    openMenuStatistics: (e)=>{
                        console.log(e.key)
                        const tab = state.currentTab
                        setState({...state, currentTab:"statistics", subMenuKeySelected: 'statistics&timetable', statistics:{...state.statistics, activeTab: false}, [tab]:{...state[tab], activeTab: false}})
                    },

                    tab:  state.currentTab,
                    subTab: state.activeSubTab,
                    
                    subMenuKeySelected: state.subMenuKeySelected,

                    activeContent: state[state.currentTab][state.activeSubTab],
                    toTitleCase: (text)=>text.charAt(0).toUpperCase() + text.substr(1),
                    myTab: state[state.currentTab],

                    //Auth Reducer
                    authState: stateAuthReducer.is_authenticated,
                    profileState:  stateAuthReducer.profile,
                    handleUserLogin: () => handleLogin(),
                    handleUserLogout: () => handleLogout(),
                    handleUserAddProfile: (profile) => handleAddProfile(profile),
                    handleUserRemoveProfile: () => handleRemoveProfile(),

                    profileListState: stateProfileListReducer.results,
                    handlePopulateUserProfileList: (profileList) => handlePopulateProfileList(profileList),
                    handlePRemoveUserProfile: (profile) => handleRemoveProfileUser(profile),
                    handleUserProfileUpdate: (profile) => handleUpdateProfileUser(profile),

                    // Nav Toggle

                    handleToggleNavReducer: (collapsed, visible) =>  handleNavToggleReducer(collapsed, visible),
                    collapsedState: stateNavToggleReducer.collapsed,
                    visibleState: stateNavToggleReducer.visible,

                
                    
                
                    //Handle auth
                    handleAuth: (props) => handleAuthentication(props),
                    authObj: auth

                }}
                >
             {props.children}
            </AppContext.Provider>
        )
    
}


export default AppProvider;