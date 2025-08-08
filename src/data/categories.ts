export type Article = {
  title: string;
  img?: string;
};

export const categories: Record<string, Article[]> = {
  "HOẠT ĐỘNG BỘ CÔNG AN": [],
  "HOẠT ĐỘNG CÔNG AN ĐỊA PHƯƠNG": [],
  "ĐỐI NGOẠI": [],
  "AN NINH TRẬT TỰ": [],
  "PHỔ BIẾN GIÁO DỤC PHÁP LUẬT": [],
  "CHỈ ĐẠO ĐIỀU HÀNH": [],
  "NGƯỜI TỐT VIỆC TỐT": [],
  "HOẠT ĐỘNG XÃ HỘI": [],
};

export const categoryPairs: [string, string][] = [
  ["HOẠT ĐỘNG BỘ CÔNG AN", "HOẠT ĐỘNG CÔNG AN ĐỊA PHƯƠNG"],
  ["ĐỐI NGOẠI", "AN NINH TRẬT TỰ"],
  ["PHỔ BIẾN GIÁO DỤC PHÁP LUẬT", "CHỈ ĐẠO ĐIỀU HÀNH"],
  ["NGƯỜI TỐT VIỆC TỐT", "HOẠT ĐỘNG XÃ HỘI"],
];