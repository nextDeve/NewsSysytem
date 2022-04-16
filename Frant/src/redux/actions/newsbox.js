export const  changeMenuState=(state)=>{
    return {
        type:'CHANGE_MENU_STATE',
        data:{isClose:state}
    }
}
export const  changeLodingState=(state)=>{
    return {
        type:'CHANGE_MENU_STATE',
        data:{isLoding:state}
    }
}