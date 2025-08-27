import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CollectionCard,
  Grid,
  Section,
  CollectionsNavigation,
} from "@/components";
import listsData from "@data/lists.json";
import { Icon28PlayRectangleStackOutline } from "@vkontakte/icons";

export const CollectionsPage = () => {
  const { collections, categories } = listsData;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCollections = useMemo(
    () =>
      activeCategory
        ? collections.filter((c) => c.category === activeCategory)
        : collections,
    [activeCategory, collections]
  );

  const handleSelectCategory = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const category = e.currentTarget.dataset.value || null;
      setActiveCategory((prev) => (prev !== category ? category : null));
    },
    []
  );

  useEffect(() => {
    document.title ="Коллекции фильмов и сериалов на VK FilmsLib"
  },[])

  return (
    <main>
      <Section title="Коллекции" icon={<Icon28PlayRectangleStackOutline />}>
        <CollectionsNavigation
          activeCategory={activeCategory}
          categories={categories}
          onSelect={handleSelectCategory}
        />
        <Grid columns={5}>
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.slug} {...collection} />
          ))}
        </Grid>
      </Section>
    </main>
  );
};
