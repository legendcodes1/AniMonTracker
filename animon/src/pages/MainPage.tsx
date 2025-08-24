import { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Welcome from "../Components/Modal/Welcome";
import Carousel from "../Components/Carousel/Carousel/Carousel";
import ItemModal from "../Components/Modal/ItemModel";
import { Item } from "../types/item";

export default function MainPage() {
  const [library, setLibrary] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0); // explicitly number

  const newReleases: Item[] = [
    {
      id: 1,
      title: "Demon Slayer: Infinity Castle",
      type: "anime",
      rating: 9.2,
      image:
        "https://cdn.noitatnemucod.net/thumbnail/300x400/100/30df93feaa422101659e14d0a2a2f582.jpg",
      status: "Completed",
      description: "The most anticipated arc of Demon Slayer finally animated.",
    },
    {
      id: 2,
      title: "Chainsaw Man: Part 2",
      type: "manga",
      rating: 8.9,
      image:
        "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3da1326e07269ddd8d73475c5dabf2c.jpg",
      status: "Completed",
      description: "Denji returns in this highly anticipated sequel.",
    },
    {
      id: 3,
      title: "Jujutsu Kaisen: Season 2",
      type: "anime",
      rating: 9.1,
      image:
        "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b51f863b05f30576cf9d85fa9b911bb5.png",
      status: "Completed",
      description: "The Culling Game arc brings new challenges.",
    },
    {
      id: 4,
      title: "Attack on Titan: Final Season",
      type: "anime",
      rating: 9.5,
      image:
        "https://cdn.noitatnemucod.net/thumbnail/300x400/100/98b21bfbd9fa3d49ec80ba8fe75ed5cd.jpg",
      status: "completed",
      description: "The epic conclusion to the legendary series.",
    },
    {
      id: 5,
      title: "One Piece: Gear 5",
      type: "manga",
      rating: 9.8,
      image:
        "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg",
      status: "ongoing",
      description: "Luffy's most powerful transformation yet.",
    },
    {
      id: 6,
      title: "My Hero Academia: Season 7",
      type: "anime",
      rating: 8.7,
      image:
        "https://cdn.noitatnemucod.net/thumbnail/300x400/100/af4938d7388aad3438e443e74b02531e.jpg",
      status: "ongoing",
      description: "Heroes face their greatest challenge.",
    },
  ];

  const addToLibrary = (item: Item) => {
    if (!library.some((lib) => lib.id === item.id)) {
      setLibrary([...library, item]);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <Welcome />
        <Carousel
          items={newReleases}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          library={library}
          onSelect={setSelectedItem}
          onAddToLibrary={addToLibrary}
        />

        {library.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">My Library</h3>
            {/* preview grid */}
          </div>
        )}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isInLibrary={library.some((lib) => lib.id === selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          onAddToLibrary={addToLibrary}
        />
      )}
    </div>
  );
}
