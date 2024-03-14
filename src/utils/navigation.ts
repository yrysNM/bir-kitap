import { NavigationContainerRef, CommonActions } from "@react-navigation/native"

let navigationRef: NavigationContainerRef<[]> | null = null

function setTopLevelNavigator(ref: NavigationContainerRef<[]> | null) {
    navigationRef = ref
}

function navigate(routeName: string, params?: never) {
    if (navigationRef) {
        navigationRef.dispatch(
            CommonActions.navigate({
                name: routeName,
                params,
            }),
        )
    }
}

export default {
    navigate,
    setTopLevelNavigator,
}
