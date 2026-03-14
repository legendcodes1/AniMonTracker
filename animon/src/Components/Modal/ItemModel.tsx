import { Item } from "../../types/item";
import { X, Star, Play, Plus } from "lucide-react";

type Props = {
  item: Item;
  isInLibrary: boolean;
  onClose: () => void;
  onAddToLibrary: (item: Item) => void;
};

export default function ItemModal({
  item,
  isInLibrary,
  onClose,
  onAddToLibrary,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full"
          >
            <X />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
          <p className="text-slate-300 mb-6">{item.description}</p>
          <button
            onClick={() => onAddToLibrary(item)}
            className={`px-6 py-3 rounded-lg ${
              isInLibrary ? "bg-green-600" : "bg-purple-600"
            }`}
          >
            <Plus /> {isInLibrary ? "Added" : "Add to Library"}
          </button>
        </div>
      </div>
    </div>
  );
}
