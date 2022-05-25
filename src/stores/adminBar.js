import {defineStore} from 'pinia';




export const useStoreAdminBar = defineStore({
    id: 'storeAdminBar',
        state: () => ({ 
            isSidebarActive:false,
            pagesActive:'' ,
            kataBijak:[]
        }),
    // state: ()=>({
    //     isSidebarActive: false,
    // }),
    getters:{
        getIsSidebarActive:(state)=> state.isSidebarActive,
        getPagesActive:(state)=> state.pagesActive,
        getKataBijak:(state)=> state.kataBijak,
    },
    actions:{
        toggleSideBar(){
            this.isSidebarActive = !this.isSidebarActive;
        },
        setPagesActive(pages){
            this.pagesActive = pages;
        },
        setKataBijak(kataBijak){
            this.kataBijak = kataBijak;
        }   
    }
});
