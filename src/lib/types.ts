export type ServiceCategoryBase = {
  slug: string;
  image: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  items: { name: string }[];
};
