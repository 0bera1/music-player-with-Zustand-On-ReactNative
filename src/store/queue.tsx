import { create } from "zustand";

type QueueStore = {
    activeQueueId: string | null;
    setActiveQueueId: (id: string) => void;
} // Burada activeQueueId şunu belirtir: Eğer bir şarkı çalınıyorsa, o şarkının id'si, eğer çalınmıyorsa null olur
// setActiveQueueId fonksiyonu ise activeQueueId'yi değiştirmek için kullanılır

export const useQueueStore = create<QueueStore>((set) => ({
    activeQueueId: null,
    setActiveQueueId: (id) => set({ activeQueueId: id }),
})) // create fonksiyonu ile bir store oluşturuyoruz

export const useQueue = () => useQueueStore((state) => state) // activeQueueId'ye erişmek için kullanılır