import { CallProfileList } from '../src/components/call/CallProfileList';
import { MainChatHeader } from '../src/components/chat/MainChatHeader';
import { NavBar } from '../src/components/utils/Navbar';
import { SearchBar } from '../src/components/utils/SearchBar';

export const CallPage = () => {
    return (
        <div className="w-full h-screen flex flex-col py-1.25">
            <MainChatHeader chatTitle="통화"/>

            <SearchBar/>

            <CallProfileList/>

            <NavBar/>
        </div>
    )
}