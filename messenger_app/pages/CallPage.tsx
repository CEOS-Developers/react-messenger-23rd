import { MainChatHeader } from '../src/components/chat/MainChatHeader';
import { NavBar } from '../src/components/utils/Navbar';
import { SearchBar } from '../src/components/utils/SearchBar';

export const CallPage = () => {
    return (
        <div className="flex flex-col px-4 py-1.25">
            <MainChatHeader chatTitle="통화"/>

            <SearchBar/>

            <NavBar/>
        </div>
    )
}