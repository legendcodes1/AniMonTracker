import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Welcome from "../../components/common/Welcome";
import Carousel from "./Carousel";
import ItemModal from "../library/ItemModal";
import { Item } from "../../types/item";
import { useNotifications } from "../../context/NotificationContext";

export default function MainPage() {
  const [library, setLibrary] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { showToast, triggerAchievement } = useNotifications();

  const newReleases: Item[] = [
    {
      id: "1",
      title: "Demon Slayer: Infinity Castle",
      type: "anime",
      rating: 9.2,
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/30df93feaa422101659e14d0a2a2f582.jpg",
      status: "Completed",
      description: "The most anticipated final arc of Demon Slayer animated with stunning Ufotable visuals.",
    },
    {
      id: "2",
      title: "Chainsaw Man: Part 2",
      type: "manga",
      rating: 8.9,
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3da1326e07269ddd8d73475c5dabf2c.jpg",
      status: "Completed",
      description: "Denji returns in this acclaimed high school sequel arc.",
    },
    {
      id: "3",
      title: "Jujutsu Kaisen: Season 2",
      type: "anime",
      rating: 9.1,
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b51f863b05f30576cf9d85fa9b911bb5.png",
      status: "Completed",
      description: "The Shibuya Incident arc shatters the jujutsu world.",
    },
    {
      id: "4",
      title: "Attack on Titan: Final Season",
      type: "anime",
      rating: 9.5,
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/98b21bfbd9fa3d49ec80ba8fe75ed5cd.jpg",
      status: "Completed",
      description: "The epic conclusion to the legendary titan saga.",
    },
    {
      id: "5",
      title: "One Piece: Egghead Arc",
      type: "manga",
      rating: 9.8,
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg",
      status: "Ongoing",
      description: "Luffy and the Straw Hats arrive at the Island of the Future.",
    },
    {
      id: "6",
      title: "Solo Leveling",
      type: "anime",
      rating: 8.8,
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/af4938d7388aad3438e443e74b02531e.jpg",
      status: "Ongoing",
      description: "Sung Jinwoo unlocks the system and ascends to the Shadow Monarch.",
    },
  ];

  const handleAddToLibrary = (item: Item) => {
    if (!library.some((lib) => lib.id === item.id)) {
      setLibrary((prev) => [...prev, item]);
      showToast({
        title: "Added to Library! 🎬",
        message: `"${item.title}" added to your collection.`,
        type: "success",
      });
      triggerAchievement("Collector", `Added ${item.title} to vault`, "⭐", 25);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <Welcome />

        <Carousel
          items={newReleases}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          library={library}
          onSelect={setSelectedItem}
          onAddToLibrary={handleAddToLibrary}
        />
      </main>

      <ItemModal
        item={selectedItem}
        isInLibrary={selectedItem ? library.some((lib) => lib.id === selectedItem.id) : false}
        onClose={() => setSelectedItem(null)}
        onAddToLibrary={handleAddToLibrary}
      />
    </div>
  );
}
