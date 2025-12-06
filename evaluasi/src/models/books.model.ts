 export interface Books  {
    id: number,
    judul: string,
    penulis: string,
    release: number
 }


 export let books: Books[] = [
    { id: 1, judul: "sherlock holmes", penulis: "sir arthur conan doyle", release: 1902},
    { id: 2, judul: "bulan", penulis: "tere liye ", release: 2015},
    { id: 3, judul: "buku masak chef el bahlil", penulis: "goblin bahlil", release: 2025}
 ]