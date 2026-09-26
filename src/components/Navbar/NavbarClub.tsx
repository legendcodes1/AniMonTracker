import Navbar from "./Navbar";

interface NavbarClubProps {
  onOpenModal: () => void;
}

export default function NavbarClub({ onOpenModal }: NavbarClubProps) {
  return (
    <Navbar
      showClubs={false}
      actions={
        <button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
          onClick={onOpenModal}
        >
          Create Club
        </button>
      }
    />
  );
}
