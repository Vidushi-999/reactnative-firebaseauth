import { firebase } from "@react-native-firebase/auth"

const FirebaseInfo={
    apiKey:'AIzaSyAQvTmX7R7SP1mSB-PXCGxYaqaPojS2iJE',
    appId:'1:1028328246703:android:6085b46776efadc07b335a',
    messagingSenderId:'1028328246703',
    projectId:'authproject-8ec4e',
}
if(FirebaseInfo!="")
{
firebase.initializeApp(FirebaseInfo)
}
