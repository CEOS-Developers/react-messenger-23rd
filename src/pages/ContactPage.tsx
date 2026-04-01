import PlusIcon from "@/assets/icons/plus.svg?react";
import Header from "@/components/Common/Header";
import SearchBar from "@/components/Common/SearchBar";
import ContactListItem from "@/components/Contact/ContactListItem";
import usersData from "@/data/users.json";
import useScrolled from "@/hooks/useScrolled";

const ContactPage = () => {
  const { scrolled, handleScroll } = useScrolled();

  return (
    <div className="flex h-full flex-col">
      <Header text="연락처" rightIcon={<PlusIcon />} showShadow={scrolled} />
      <main className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <SearchBar placeholder="Search Contacts" />
      </main>
    </div>
  );
};

export default ContactPage;
